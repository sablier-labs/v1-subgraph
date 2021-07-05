import { BigInt } from "@graphprotocol/graph-ts";

// Hopefully we will be able to remove these once The Graph adds support for "endBlock".
// https://github.com/graphprotocol/support/issues/49
export let GOERLI_CUTOFF_BLOCK: BigInt = BigInt.fromI32(5087608);
export let KOVAN_CUTOFF_BLOCK: BigInt = BigInt.fromI32(25924782);
export let MAINNET_CUTOFF_BLOCK: BigInt = BigInt.fromI32(12767222);
export let RINKEBY_CUTOFF_BLOCK: BigInt = BigInt.fromI32(8883155);
export let ROPSTEN_CUTOFF_BLOCK: BigInt = BigInt.fromI32(10572870);
