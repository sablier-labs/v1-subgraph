import { Address, ethereum } from "@graphprotocol/graph-ts";

import { ERC20 as Erc20Contract } from "../types/Sablier/ERC20";
import { ERC20NameBytes32 as ERC20NameBytes32Contract } from "../types/Sablier/ERC20NameBytes32";
import { ERC20SymbolBytes32 as ERC20SymbolBytes32Contract } from "../types/Sablier/ERC20SymbolBytes32";
import { StreamTransaction, Token } from "../types/schema";

export function createStreamTransaction(name: string, event: ethereum.Event, streamId: string): void {
  let txhash: string = event.transaction.hash.toHex();
  let streamTransaction: StreamTransaction = new StreamTransaction(txhash + "-" + event.logIndex.toString());
  streamTransaction.event = name;
  streamTransaction.block = event.block.number.toI32();
  streamTransaction.from = event.transaction.from;
  streamTransaction.stream = streamId;
  streamTransaction.timestamp = event.block.timestamp;
  streamTransaction.to = event.transaction.to;
  streamTransaction.txhash = txhash;
  streamTransaction.save();
}

export function createToken(id: string): Token {
  let token: Token = new Token(id);
  let tokenAddress: Address = Address.fromString(id);
  let contract: Erc20Contract = Erc20Contract.bind(tokenAddress);
  let contractNameBytes32: ERC20NameBytes32Contract = ERC20NameBytes32Contract.bind(tokenAddress);
  let contractSymbolBytes32: ERC20SymbolBytes32Contract = ERC20SymbolBytes32Contract.bind(tokenAddress);

  let decimals: i32 = 0;
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
  let token: Token | null = Token.load(id);
  if (token == null) {
    token = createToken(id);
  }
  return token as Token;
}
