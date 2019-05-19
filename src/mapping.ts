import { ByteArray, Bytes, crypto, EthereumEvent } from "@graphprotocol/graph-ts";

import { RawStream, Redeemal, Stream, Token, Transaction, Withdrawal } from "./types/schema";
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

function addToken(address: string, rawStreamId: string): void {
  let token = Token.load(address);
  if (token != null) {
    return;
  }

  token = new Token(address);

  if (address == "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359") {
    token.decimals = 18;
    token.name = "Dai Stablecoin v1.0";
    token.symbol = "DAI";
  } else if (address == "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd") {
    token.decimals = 2;
    token.name = "Gemini Dollar";
    token.symbol = "GUSD";
  } else if (address == "0x8e870d67f660d95d5be530380d0ec0bd388289e1") {
    token.decimals = 18;
    token.name = "Paxos Standard";
    token.symbol = "PAX";
  } else if (address == "0x0000000000085d4780b73119b644ae5ecd22b376") {
    token.decimals = 18;
    token.name = "TrueUSD";
    token.symbol = "TUSD";
  } else if (address == "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48") {
    token.decimals = 6;
    token.name = "USD Coin";
    token.symbol = "USDC";
  } else if (address == "0x8ad3aa5d5ff084307d28c8f514d7a193b2bfe725") {
    token.decimals = 18;
    token.name = "Rinkeby Dai";
    token.symbol = "DAI";
  } else {
    token.decimals = null;
    token.name = null;
    token.symbol = null;
  }

  token.save();
}

export function handleCreateStream(event: CreateStreamEvent): void {
  let rawStreamId = event.params.streamId.toString();
  let rawStream = new RawStream(rawStreamId);
  rawStream.interval = event.params.interval;
  rawStream.payment = event.params.payment;
  rawStream.recipient = event.params.recipient;
  rawStream.sender = event.params.sender;
  rawStream.startBlock = event.params.startBlock;
  rawStream.status = "CREATED";
  rawStream.stopBlock = event.params.stopBlock;
  rawStream.token = event.params.tokenAddress.toHex();
  rawStream.txs = new Array<string>();
  rawStream.withdrawals = new Array<string>();
  rawStream.save();

  let txhash = event.transaction.hash.toHex();
  addTransaction("CreateStream", event, rawStreamId, txhash);

  let outStreamId = event.params.sender.toHex() + "/" + rawStreamId;
  let outStream = new Stream(outStreamId);
  outStream.flow = "OUT";
  outStream.owner = event.params.sender;
  outStream.rawStream = rawStreamId;
  outStream.timestamp = event.block.timestamp.toI32();
  outStream.save();

  let inStreamId = event.params.recipient.toHex() + "/" + rawStreamId;
  let inStream = new Stream(inStreamId);
  inStream.flow = "IN";
  inStream.owner = event.params.recipient;
  inStream.rawStream = rawStreamId;
  inStream.timestamp = event.block.timestamp.toI32();
  inStream.save();

  addToken(event.params.tokenAddress.toHex(), rawStreamId);
}

export function handleWithdrawFromStream(event: WithdrawFromStreamEvent): void {
  let rawStreamId = event.params.streamId.toString();
  let rawStream = RawStream.load(rawStreamId);
  if (rawStream == null) {
    return;
  }

  let txhash = event.transaction.hash.toHex();
  addTransaction("WithdrawFromStream", event, rawStreamId, txhash);

  let withdrawal = new Withdrawal(txhash);
  withdrawal.amount = event.params.amount;
  withdrawal.rawStream = rawStreamId;
  withdrawal.save();
}

export function handleRedeemStream(event: RedeemStreamEvent): void {
  let rawStreamId = event.params.streamId.toString();
  let rawStream = RawStream.load(rawStreamId);
  if (rawStream == null) {
    return;
  }
  rawStream.status = "REDEEMED";
  rawStream.save();

  let txhash = event.transaction.hash.toHex();
  addTransaction("RedeemStream", event, rawStreamId, txhash);

  let redeemal = new Redeemal(rawStreamId);
  redeemal.rawStream = rawStreamId;
  redeemal.senderAmount = event.params.senderAmount;
  redeemal.recipientAmount = event.params.senderAmount;
  redeemal.save();
}
