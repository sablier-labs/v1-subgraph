import { Token } from "../types/schema";

export function addToken(address: string): void {
  let token = Token.load(address);
  if (token != null) {
    return;
  }

  token = new Token(address);

  if (address == "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359") {
    token.decimals = 18;
    token.name = "Dai Stablecoin v1.0";
    token.symbol = "DAI";
  } else if (address == "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd") {
    token.decimals = 2;
    token.name = "Gemini Dollar";
    token.symbol = "GUSD";
  } else if (address == "0x8e870d67f660d95d5be530380d0ec0bd388289e1") {
    token.decimals = 18;
    token.name = "Paxos Standard";
    token.symbol = "PAX";
  } else if (address == "0x0000000000085d4780b73119b644ae5ecd22b376") {
    token.decimals = 18;
    token.name = "TrueUSD";
    token.symbol = "TUSD";
  } else if (address == "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48") {
    token.decimals = 6;
    token.name = "USD Coin";
    token.symbol = "USDC";
  } else if (address == "0x7d669a64deb8a4a51eea755bb0e19fd39ce25ae9") {
  /* Token used for testing on Kovan  */
    token.decimals = 18;
    token.name = "Testnet Dai";
    token.symbol = "DAI";
  } else {
    token.decimals = null;
    token.name = null;
    token.symbol = null;
  }

  token.save();
}
