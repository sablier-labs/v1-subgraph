import { EthereumEvent } from "@graphprotocol/graph-ts";

import { Transaction } from "../types/schema";

export function addTransaction(name: string, event: EthereumEvent, streamId: string): void {
  let transaction = new Transaction(event.transaction.hash.toHex());
  transaction.event = name;
  transaction.block = event.block.number.toI32();
  transaction.stream = streamId;
  transaction.timestamp = event.block.timestamp;
  transaction.save();
}
