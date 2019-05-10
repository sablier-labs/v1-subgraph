import { BigInt, EthereumEvent } from "@graphprotocol/graph-ts";

import { Balance, Stream, Transaction } from "./types/schema";
import {
  CreateStream as CreateStreamEvent,
  WithdrawFromStream as WithdrawFromStreamEvent,
  RedeemStream as RedeemStreamEvent,
} from "./types/Sablier/Sablier";

function addTransaction(name: string, event: EthereumEvent, streamId: string, txhash: string): void {
  let transaction = new Transaction(txhash);
  transaction.event = name;
  transaction.block = event.block.number.toI32();
  transaction.stream = streamId;
  transaction.timestamp = event.block.timestamp.toI32();
  transaction.save();
}

export function handleCreateStream(event: CreateStreamEvent): void {
  let id = event.params.streamId.toHex();
  let stream = new Stream(id);
  stream.status = "Created";
  stream.sender = event.params.sender;
  stream.recipient = event.params.recipient;
  stream.tokenAddress = event.params.tokenAddress;
  stream.startBlock = event.params.startBlock;
  stream.stopBlock = event.params.stopBlock;
  stream.payment = event.params.payment;
  stream.interval = event.params.interval;
  stream.save();

  let balance = new Balance(id);
  balance.contract = event.params.deposit;
  balance.sender = event.params.deposit;
  balance.stream = id;
  balance.recipient = new BigInt(0);
  balance.save();

  let txhash = event.transaction.hash.toHex();
  addTransaction("CreateStream", event, id, txhash);
}

export function handleWithdrawFromStream(event: WithdrawFromStreamEvent): void {
  let id = event.params.streamId.toHex();
  let stream = Stream.load(id);
  if (stream == null) {
    return;
  }

  let balance = Balance.load(id);
  if (balance == null) {
    return;
  }
  let funds = event.params.funds;
  balance.contract = balance.contract.minus(funds);
  balance.sender = balance.sender.minus(funds);
  balance.recipient = balance.recipient.plus(funds);
  balance.save();

  let txhash = event.transaction.hash.toHex();
  addTransaction("WithdrawFromStream", event, id, txhash);
}

export function handleRedeemStream(event: RedeemStreamEvent): void {
  let id = event.params.streamId.toHex();
  let stream = Stream.load(id);
  if (stream == null) {
    return;
  }
  stream.status = "Redeemed";
  stream.save();

  let balance = Balance.load(id);
  if (balance == null) {
    return;
  }
  balance.contract = new BigInt(0);
  balance.sender = event.params.senderBalance;
  balance.recipient = event.params.recipientBalance;
  balance.save();

  let txhash = event.transaction.hash.toHex();
  addTransaction("RedeemStream", event, id, txhash);
}
