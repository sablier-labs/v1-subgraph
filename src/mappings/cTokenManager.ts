import { CToken } from "../types/schema";
import {
  WhitelistCToken as WhitelistCTokenEvent,
  DiscardCToken as DiscardCTokenEvent,
} from "../types/CTokenManager/CTokenManager";

function addCToken(address: string): void {
  let cToken = CToken.load(address);
  if (cToken != null) {
    return;
  }

  cToken = new CToken(address);

  if (address == "0xf5dce57282a584d2746faf1593d3121fcac444dc") {
    cToken.decimals = 8;
    cToken.name = "Compound Dai";
    cToken.symbol = "cDAI";
  } else if (address == "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5") {
    cToken.decimals = 8;
    cToken.name = "Compound Ether";
    cToken.symbol = "cETH";
  } else if (address == "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48") {
    cToken.decimals = 8;
    cToken.name = "Compound USD Coin";
    cToken.symbol = "USDC";
  } else if (address == "0xc11b1268c1a384e55c48c2391d8d480264a3a7f4") {
    cToken.decimals = 8;
    cToken.name = "Compound Wrapped BTC";
    cToken.symbol = "WBTC";
  } else {
    cToken.decimals = null;
    cToken.name = null;
    cToken.symbol = null;
  }

  cToken.whitelisted = false;
  cToken.save();
}

export function handleWhitelistCToken(event: WhitelistCTokenEvent): void {
  addCToken(event.params.tokenAddress.toHex());
  let cToken = CToken.load(event.params.tokenAddress.toHex());
  if (cToken == null) {
    return;
  }
  cToken.whitelisted = true;
  cToken.save();
}

export function handleDiscardCToken(event: DiscardCTokenEvent): void {
  let cToken = CToken.load(event.params.tokenAddress.toHex());
  if (cToken == null) {
    return;
  }
  if (!cToken.whitelisted) {
    return;
  }
  cToken.whitelisted = false;
  cToken.save();
}
