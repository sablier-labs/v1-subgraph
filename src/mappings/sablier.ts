import { createStreamTransaction, loadOrCreateToken, loadStream } from "../helpers/database";
import {
  CancelStream as CancelStreamEvent,
  CreateStream as CreateStreamEvent,
  WithdrawFromStream as WithdrawFromStreamEvent,
} from "../types/SablierV1.1.0/Sablier";
import { Cancellation, Stream, Withdrawal } from "../types/schema";

export function handleCreateStream(event: CreateStreamEvent): void {
  let streamId: string = event.params.streamId.toString();
  let tokenAddress: string = event.params.tokenAddress.toHex();

  // Create the stream entity.
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
  let stream: Stream | null = loadStream(event.params.streamId.toString());
  if (stream == null) {
    return;
  }

  // Create the withdrawal entity.
  let txhash: string = event.transaction.hash.toHex();
  let withdrawal: Withdrawal = new Withdrawal(txhash + "-" + event.logIndex.toString());
  withdrawal.amount = event.params.amount;
  withdrawal.stream = stream.id;
  withdrawal.timestamp = event.block.timestamp;
  withdrawal.token = stream.token;
  withdrawal.txhash = txhash;
  withdrawal.save();

  // Create a stream transaction entity.
  createStreamTransaction("WithdrawFromStream", event, stream.id);
}

export function handleCancelStream(event: CancelStreamEvent): void {
  let stream: Stream | null = loadStream(event.params.streamId.toString());
  if (stream == null) {
    return;
  }

  // Create the cancellation entity.
  let cancellation: Cancellation = new Cancellation(stream.id);
  cancellation.recipientBalance = event.params.recipientBalance;
  cancellation.senderBalance = event.params.senderBalance;
  cancellation.timestamp = event.block.timestamp;
  cancellation.token = stream.token;
  cancellation.txhash = event.transaction.hash.toHex();
  cancellation.save();

  // Update the stream entity.
  stream.cancellation = stream.id;
  stream.save();

  // Create a stream transaction entity.
  createStreamTransaction("CancelStream", event, stream.id);
}
