import { dataSource, ethereum } from "@graphprotocol/graph-ts";

import {
  GOERLI_CUTOFF_BLOCK,
  KOVAN_CUTOFF_BLOCK,
  MAINNET_CUTOFF_BLOCK,
  RINKEBY_CUTOFF_BLOCK,
  ROPSTEN_CUTOFF_BLOCK,
} from "./constants";

export function hasPassedCutoffBlock(event: ethereum.Event): boolean {
  let network: string = dataSource.network();

  if (network == "goerli" && event.block.number.gt(GOERLI_CUTOFF_BLOCK)) {
    return true;
  } else if (network == "kovan" && event.block.number.gt(KOVAN_CUTOFF_BLOCK)) {
    return true;
  } else if (network == "mainnet" && event.block.number.gt(MAINNET_CUTOFF_BLOCK)) {
    return true;
  } else if (network == "rinkeby" && event.block.number.gt(RINKEBY_CUTOFF_BLOCK)) {
    return true;
  } else if (network == "ropsten" && event.block.number.gt(ROPSTEN_CUTOFF_BLOCK)) {
    return true;
  }

  return false;
}
