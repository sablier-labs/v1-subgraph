import { Address, ethereum } from "@graphprotocol/graph-ts";

import { StreamTransaction, Token } from "../types/schema";
import { Erc20 as Erc20Contract } from "../types/Sablier/Erc20";

export function createStreamTransaction(name: string, event: ethereum.Event, streamId: string): void {
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

export function createToken(id: string): Token {
  let contract: Erc20Contract = Erc20Contract.bind(Address.fromString(id));
  let token = new Token(id);

  let decimals = 0;
  let decimalsContractCall = contract.try_decimals();
  if (!decimalsContractCall.reverted) {
    decimals = decimalsContractCall.value;
  }
  token.decimals = decimals;

  let name: string = null;
  let nameContractCall = contract.try_name();
  if (!nameContractCall.reverted) {
    name = nameContractCall.value;
  }
  token.name = name;

  let symbol: string = null;
  let symbolContractCall = contract.try_symbol();
  if (!symbolContractCall.reverted) {
    symbol = symbolContractCall.value;
  }
  token.symbol = symbol;

  token.save();
  return token;
}

export function loadOrCreateToken(id: string): Token {
  let token = Token.load(id);
  if (token == null) {
    token = createToken(id);
  }
  return token as Token;
}
