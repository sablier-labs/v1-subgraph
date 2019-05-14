import { ByteArray, Bytes, crypto, EthereumEvent } from "@graphprotocol/graph-ts";

import { RawStream, Redeemal, Stream, Transaction, Withdrawal } from "./types/schema";
import {
  CreateStream as CreateStreamEvent,
  WithdrawFromStream as WithdrawFromStreamEvent,
  RedeemStream as RedeemStreamEvent,
} from "./types/Sablier/Sablier";

function addTransaction(name: string, event: EthereumEvent, rawStreamId: string, txhash: string): void {
  let transaction = new Transaction(txhash);
  transaction.event = name;
  transaction.block = event.block.number.toI32();
  transaction.rawStream = rawStreamId;
  transaction.timestamp = event.block.timestamp.toI32();
  transaction.save();
}

export function handleCreateStream(event: CreateStreamEvent): void {
  let rawStreamId = event.params.streamId.toHex();
  let rawStream = new RawStream(rawStreamId);
  rawStream.interval = event.params.interval;
  rawStream.payment = event.params.payment;
  rawStream.recipient = event.params.recipient;
  rawStream.sender = event.params.sender;
  rawStream.startBlock = event.params.startBlock;
  rawStream.status = "Created";
  rawStream.stopBlock = event.params.stopBlock;
  rawStream.tokenAddress = event.params.tokenAddress;
  rawStream.txs = new Array<string>();
  rawStream.withdrawals = new Array<string>();
  rawStream.save();

  let txhash = event.transaction.hash.toHex();

  let outStreamId = event.params.sender.toHex() + "/" + rawStreamId;
  let outStream = new Stream(outStreamId);
  outStream.flow = "Out";
  outStream.owner = event.params.sender;
  outStream.rawStream = rawStreamId;
  outStream.save();

  let inStreamId = event.params.recipient.toHex() + "/" + rawStreamId;
  let inStream = new Stream(inStreamId);
  inStream.flow = "In";
  inStream.owner = event.params.recipient;
  inStream.rawStream = rawStreamId;
  inStream.save();

  addTransaction("CreateStream", event, rawStreamId, txhash);
}

export function handleWithdrawFromStream(event: WithdrawFromStreamEvent): void {
  let rawStreamId = event.params.streamId.toHex();
  let rawStream = RawStream.load(rawStreamId);
  if (rawStream == null) {
    return;
  }

  let txhash = event.transaction.hash.toHex();
  let withdrawal = new Withdrawal(txhash);
  withdrawal.amount = event.params.amount;
  withdrawal.rawStream = rawStreamId;

  addTransaction("WithdrawFromStream", event, rawStreamId, txhash);
}

export function handleRedeemStream(event: RedeemStreamEvent): void {
  let rawStreamId = event.params.streamId.toHex();
  let rawStream = RawStream.load(rawStreamId);
  if (rawStream == null) {
    return;
  }
  rawStream.status = "Redeemed";
  rawStream.save();

  let redeemal = new Redeemal(rawStreamId);
  redeemal.rawStream = rawStreamId;
  redeemal.senderAmount = event.params.senderAmount;
  redeemal.recipientAmount = event.params.senderAmount;

  let txhash = event.transaction.hash.toHex();
  addTransaction("RedeemStream", event, rawStreamId, txhash);
}
