import { Address, ethereum } from "@graphprotocol/graph-ts";

import { Erc20 as Erc20Contract } from "../types/Sablier/Erc20";
import { Erc20NameBytes32 as Erc20NameBytes32Contract } from "../types/Sablier/Erc20NameBytes32";
import { Erc20SymbolBytes32 as Erc20SymbolBytes32Contract } from "../types/Sablier/Erc20SymbolBytes32";
import { StreamTransaction, Token } from "../types/schema";

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
  let tokenAddress: Address = Address.fromString(id);
  let contract: Erc20Contract = Erc20Contract.bind(tokenAddress);
  let contractNameBytes32: Erc20NameBytes32Contract = Erc20NameBytes32Contract.bind(tokenAddress);
  let contractSymbolBytes32: Erc20SymbolBytes32Contract = Erc20SymbolBytes32Contract.bind(tokenAddress);
  let token = new Token(id);

  let decimals = 0;
  let decimalsContractCall = contract.try_decimals();
  if (!decimalsContractCall.reverted) {
    decimals = decimalsContractCall.value;
  }
  token.decimals = decimals;

  let name: string = "Unknown";
  let nameStringCall = contract.try_name();
  if (nameStringCall.reverted) {
    let nameBytesCall = contractNameBytes32.try_name();
    if (!nameBytesCall.reverted) {
      name = nameBytesCall.value.toString();
    }
  } else {
    name = nameStringCall.value;
  }
  token.name = name;

  let symbol: string = "Unknown";
  let symbolStringCall = contract.try_symbol();
  if (symbolStringCall.reverted) {
    let symbolBytesCall = contractSymbolBytes32.try_symbol();
    if (!symbolBytesCall.reverted) {
      symbol = symbolBytesCall.value.toString();
    }
  } else {
    symbol = symbolStringCall.value;
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
