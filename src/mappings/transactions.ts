import { EthereumEvent } from "@graphprotocol/graph-ts";

import { StreamTransaction } from "../types/schema";

export function addStreamTransaction(name: string, event: EthereumEvent, streamId: string): void {
  let streamTransaction = new StreamTransaction(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  streamTransaction.event = name;
  streamTransaction.block = event.block.number.toI32();
  streamTransaction.from = event.transaction.from;
  streamTransaction.stream = streamId;
  streamTransaction.timestamp = event.block.timestamp;
  streamTransaction.to = event.transaction.to;
  streamTransaction.txhash = event.transaction.hash.toHex();
  streamTransaction.save();
}
