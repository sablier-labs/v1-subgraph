import { EthereumEvent } from "@graphprotocol/graph-ts";

import { Cancellation, Stream, Token, Transaction, Withdrawal } from "../types/schema";
import {
  CreateStream as CreateStreamEvent,
  CreateCompoundingStream as CreateCompoundingStreamEvent,
  WithdrawFromStream as WithdrawFromStreamEvent,
  CancelStream as CancelStreamEvent,
  PayInterest as PayInterestEvent,
} from "../types/Sablier/Sablier";

function addTransaction(name: string, event: EthereumEvent, streamId: string, txhash: string): void {
  let transaction = new Transaction(txhash);
  transaction.event = name;
  transaction.block = event.block.number.toI32();
  transaction.stream = streamId;
  transaction.timestamp = event.block.timestamp;
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
  } else if (address == "0x7d669a64deb8a4a51eea755bb0e19fd39ce25ae9") {
    token.decimals = 18;
    token.name = "Testnet Dai";
    token.symbol = "DAI";
  } else {
    token.decimals = null;
    token.name = null;
    token.symbol = null;
  }

  token.save();
}

export function handleCreateStream(event: CreateStreamEvent): void {
  /* Create the stream object */
  let streamId = event.params.streamId.toString();
  let stream = new Stream(streamId);
  stream.deposit = event.params.deposit;
  stream.ratePerSecond = event.params.deposit.div(event.params.stopTime.minus(event.params.startTime));
  stream.recipient = event.params.recipient;
  stream.sender = event.params.sender;
  stream.startTime = event.params.startTime;
  stream.stopTime = event.params.stopTime;
  stream.timestamp = event.block.timestamp;
  stream.token = event.params.tokenAddress.toHex();
  stream.txs = new Array<string>();
  stream.withdrawals = new Array<string>();
  stream.save();

  /* Create adjacent but important objects */
  let txhash = event.transaction.hash.toHex();
  addTransaction("CreateStream", event, streamId, txhash);
  addToken(event.params.tokenAddress.toHex());
}

export function handleCreateCompoundingStream(event: CreateCompoundingStreamEvent): void {
  let streamId = event.params.streamId.toString();
  let stream = Stream.load(streamId);
  if (stream == null) {
    return;
  }

  stream.exchangeRateInitial = event.params.exchangeRate;
  stream.senderSharePercentage = event.params.senderSharePercentage;
  stream.recipientSharePercentage = event.params.recipientSharePercentage;
  stream.save();

  let txhash = event.transaction.hash.toHex();
  addTransaction("CreateCompoundingStream", event, streamId, txhash);
}

export function handleWithdrawFromStream(event: WithdrawFromStreamEvent): void {
  let streamId = event.params.streamId.toString();
  let stream = Stream.load(streamId);
  if (stream == null) {
    return;
  }

  let withdrawal = new Withdrawal(event.transaction.hash.toHex());
  withdrawal.amount = event.params.amount;
  withdrawal.stream = streamId;
  withdrawal.save();

  let txhash = event.transaction.hash.toHex();
  addTransaction("WithdrawFromStream", event, streamId, txhash);
}

export function handleCancelStream(event: CancelStreamEvent): void {
  let streamId = event.params.streamId.toString();
  let stream = Stream.load(streamId);
  if (stream == null) {
    return;
  }

  let cancellation = new Cancellation(streamId);
  cancellation.recipientBalance = event.params.recipientBalance;
  cancellation.senderBalance = event.params.senderBalance;
  cancellation.save();

  stream.cancellation = streamId;
  stream.save();

  let txhash = event.transaction.hash.toHex();
  addTransaction("CancelStream", event, streamId, txhash);
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
