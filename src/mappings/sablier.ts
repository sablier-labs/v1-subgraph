import { createStreamTransaction, loadOrCreateToken } from "../helpers/database";
import {
  CancelStream as CancelStreamEvent,
  CreateStream as CreateStreamEvent,
  WithdrawFromStream as WithdrawFromStreamEvent,
} from "../types/Sablier/Sablier";
import { Cancellation, Stream, Withdrawal } from "../types/schema";

export function handleCreateStream(event: CreateStreamEvent): void {
  // Create the stream entity.
  let streamId: string = event.params.streamId.toString();
  let tokenAddress: string = event.params.tokenAddress.toHex();

  let stream: Stream = new Stream(streamId);
  stream.deposit = event.params.deposit;
  stream.ratePerSecond = event.params.deposit.div(event.params.stopTime.minus(event.params.startTime));
  stream.recipient = event.params.recipient;
  stream.sender = event.params.sender;
  stream.startTime = event.params.startTime;
  stream.stopTime = event.params.stopTime;
  stream.timestamp = event.block.timestamp;
  stream.token = tokenAddress;
  stream.save();

  // Create adjacent but important entities.
  createStreamTransaction("CreateStream", event, streamId);
  loadOrCreateToken(tokenAddress);
}

export function handleWithdrawFromStream(event: WithdrawFromStreamEvent): void {
  let streamId: string = event.params.streamId.toString();
  let stream: Stream | null = Stream.load(streamId);
  if (stream == null) {
    return;
  }

  let txhash: string = event.transaction.hash.toHex();
  let withdrawal: Withdrawal = new Withdrawal(txhash + "-" + event.logIndex.toString());
  withdrawal.amount = event.params.amount;
  withdrawal.stream = streamId;
  withdrawal.timestamp = event.block.timestamp;
  withdrawal.token = stream.token;
  withdrawal.txhash = txhash;
  withdrawal.save();

  createStreamTransaction("WithdrawFromStream", event, streamId);
}

export function handleCancelStream(event: CancelStreamEvent): void {
  let streamId: string = event.params.streamId.toString();
  let stream: Stream | null = Stream.load(streamId);
  if (stream == null) {
    return;
  }

  let cancellation: Cancellation = new Cancellation(streamId);
  cancellation.recipientBalance = event.params.recipientBalance;
  cancellation.senderBalance = event.params.senderBalance;
  cancellation.timestamp = event.block.timestamp;
  cancellation.token = stream.token;
  cancellation.txhash = event.transaction.hash.toHex();
  cancellation.save();

  stream.cancellation = streamId;
  stream.save();

  createStreamTransaction("CancelStream", event, streamId);
}
