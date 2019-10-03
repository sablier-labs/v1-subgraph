import { EthereumEvent } from "@graphprotocol/graph-ts";

import { Cancellation, RawStream, Stream, Token, Transaction, Withdrawal } from "../types/schema";
import {
  CreateStream as CreateStreamEvent,
  CreateCompoundingStream as CreateCompoundingStreamEvent,
  WithdrawFromStream as WithdrawFromStreamEvent,
  CancelStream as CancelStreamEvent,
  PayInterest as PayInterestEvent,
} from "../types/Sablier/Sablier";

function addTransaction(name: string, event: EthereumEvent, rawStreamId: string, txhash: string): void {
  let transaction = new Transaction(txhash);
  transaction.event = name;
  transaction.block = event.block.number.toI32();
  transaction.rawStream = rawStreamId;
  transaction.timestamp = event.block.timestamp.toI32();
  transaction.save();
}

function addToken(address: string): void {
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
  /* Create the raw stream object */
  let rawStreamId = event.params.streamId.toString();
  let rawStream = new RawStream(rawStreamId);
  rawStream.deposit = event.params.deposit;
  rawStream.recipient = event.params.recipient;
  rawStream.sender = event.params.sender;
  rawStream.startTime = event.params.startTime;
  rawStream.stopTime = event.params.stopTime;
  rawStream.token = event.params.tokenAddress.toHex();
  rawStream.txs = new Array<string>();
  rawStream.withdrawals = new Array<string>();
  rawStream.save();

  /**
   * We fittingly create additional objects for the sender and the recipient,
   * so that showing data in the client app is easy.
   */
  let outStreamId = event.params.sender.toHex() + "/" + rawStreamId;
  let outStream = new Stream(outStreamId);
  outStream.who = event.params.sender;
  outStream.rawStream = rawStreamId;
  outStream.timestamp = event.block.timestamp.toI32();
  outStream.save();

  let inStreamId = event.params.recipient.toHex() + "/" + rawStreamId;
  let inStream = new Stream(inStreamId);
  inStream.who = event.params.recipient;
  inStream.rawStream = rawStreamId;
  inStream.timestamp = event.block.timestamp.toI32();
  inStream.save();

  /* Create adjacent but important objects */
  let txhash = event.transaction.hash.toHex();
  addTransaction("CreateStream", event, rawStreamId, txhash);
  addToken(event.params.tokenAddress.toHex());
}

export function handleCreateCompoundingStream(event: CreateCompoundingStreamEvent): void {
  let rawStreamId = event.params.streamId.toString();
  let rawStream = RawStream.load(rawStreamId);
  if (rawStream == null) {
    return;
  }

  rawStream.exchangeRateInitial = event.params.exchangeRate;
  rawStream.senderSharePercentage = event.params.senderSharePercentage;
  rawStream.recipientSharePercentage = event.params.recipientSharePercentage;
  rawStream.save();

  let txhash = event.transaction.hash.toHex();
  addTransaction("CreateCompoundingStream", event, rawStreamId, txhash);
}

export function handleWithdrawFromStream(event: WithdrawFromStreamEvent): void {
  let rawStreamId = event.params.streamId.toString();
  let rawStream = RawStream.load(rawStreamId);
  if (rawStream == null) {
    return;
  }

  let withdrawal = new Withdrawal(event.transaction.hash.toHex());
  withdrawal.amount = event.params.amount;
  withdrawal.rawStream = rawStreamId;
  withdrawal.save();

  let txhash = event.transaction.hash.toHex();
  addTransaction("WithdrawFromStream", event, rawStreamId, txhash);
}

export function handleCancelStream(event: CancelStreamEvent): void {
  let rawStreamId = event.params.streamId.toString();
  let rawStream = RawStream.load(rawStreamId);
  if (rawStream == null) {
    return;
  }

  let cancellation = new Cancellation(rawStreamId);
  cancellation.recipientBalance = event.params.recipientBalance;
  cancellation.senderBalance = event.params.senderBalance;
  cancellation.save();

  rawStream.cancellation = rawStreamId;
  rawStream.save();

  let txhash = event.transaction.hash.toHex();
  addTransaction("CancelStream", event, rawStreamId, txhash);
}

export function handlePayInterest(event: PayInterestEvent): void {
  /**
   * This event could be generated by either a `withdrawFromStream` or `cancelStream` tx.
   * We have to check for both because we can't know beforehand.
   */
  let streamId = event.params.streamId.toString();
  let txhash = event.transaction.hash.toHex();
  let cancellation = Cancellation.load(streamId);
  let withdrawal = Withdrawal.load(txhash);

  if (withdrawal != null) {
    withdrawal.recipientInterest = event.params.recipientInterest;
    withdrawal.sablierInterest = event.params.sablierInterest;
    withdrawal.senderInterest = event.params.senderInterest;
  } else if (cancellation != null) {
    cancellation.recipientInterest = event.params.recipientInterest;
    cancellation.sablierInterest = event.params.sablierInterest;
    cancellation.senderInterest = event.params.senderInterest;
  }
}
