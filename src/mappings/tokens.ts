import { Token } from "../types/schema";

export function addToken(address: string): void {
  let token = Token.load(address);
  if (token != null) {
    return;
  }

  /* Mainnet */
  token = new Token(address);
  if (address == "0x06af07097c9eeb7fd685c692751d5c66db49c215") {
    token.decimals = 18;
    token.name = "Chai";
    token.symbol = "CHAI";
  } else if (address == "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643") {
    token.decimals = 8;
    token.name = "Compound Dai";
    token.symbol = "cDAI";
  } else if (address == "0x39aa39c021dfbae8fac545936693ac917d5e7563") {
    token.decimals = 8;
    token.name = "Compound USD Coin";
    token.symbol = "cUSDC";
  } else if (address == "0xea0bea4d852687c45fdc57f6b06a8a92302baabc") {
    token.decimals = 18;
    token.name = "Counsel";
    token.symbol = "CNSL";
  } else if (address == "0x6b175474e89094c44da98b954eedeac495271d0f") {
    token.decimals = 18;
    token.name = "Dai Stablecoin";
    token.symbol = "DAI";
  } else if (address == "0x493c57c4763932315a328269e1adad09653b9081") {
    token.decimals = 18;
    token.name = "Fulcrum DAI iToken";
    token.symbol = "iDAI";
  } else if (address == "0xf013406a0b1d544238083df0b93ad0d2cbe0f65f") {
    token.decimals = 6;
    token.name = "Fulcrum USDC iToken";
    token.symbol = "iUSDC";
  } else if (address == "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359") {
    token.decimals = 18;
    token.name = "Sai Stablecoin v1.0";
    token.symbol = "SAI";
  } else if (address == "0x67ab11058ef23d0a19178f61a050d3c38f81ae21") {
    token.decimals = 18;
    token.name = "Self Token";
    token.symbol = "SELF";
  } else if (address == "0x57ab1e02fee23774580c119740129eac7081e9d3") {
    token.decimals = 18;
    token.name = "Synth sUSD";
    token.symbol = "sUSD";
  } else if (address == "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48") {
    token.decimals = 6;
    token.name = "USD Coin";
    token.symbol = "USDC";
  } else if (address == "0x58b6a8a3302369daec383334672404ee733ab239") {
    token.decimals = 18;
    token.name = "Livepeer Token";
    token.symbol = "LPT";
  } else if (address == "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599") {
    token.decimals = 8;
    token.name = "Wrapped Bitcoin";
    token.symbol = "wBTC";
  } else if (address == "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") {
    token.decimals = 18;
    token.name = "wETH";
    token.symbol = "Wrapped Ether";

    /**
     *
     * New tokens
     *
     */
  } else if (address == "0x960b236A07cf122663c4303350609A66A7B288C0") {
    token.decimals = 18;
    token.name = "ANT";
    token.symbol = "Aragon Network Token";
  } else if (address == "0x0D8775F648430679A709E98d2b0Cb6250d2887EF") {
    token.decimals = 18;
    token.name = "BAT";
    token.symbol = "Basic Attention Token";
  } else if (address == "0xdd974D5C2e2928deA5F71b9825b8b646686BD200") {
    token.decimals = 18;
    token.name = "KNC";
    token.symbol = "Kyber Network Crystal";
  } else if (address == "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942") {
    token.decimals = 18;
    token.name = "MANA";
    token.symbol = "Decentraland MANA";
  } else if (address == "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2") {
    token.decimals = 18;
    token.name = "MKR";
    token.symbol = "Maker";
  } else if (address == "0x4575f41308EC1483f3d399aa9a2826d74Da13Deb") {
    token.decimals = 18;
    token.name = "OXT";
    token.symbol = "Orchid";
  } else if (address == "0x408e41876cCCDC0F92210600ef50372656052a38") {
    token.decimals = 18;
    token.name = "REN";
    token.symbol = "Republic Token";
  } else if (address == "0x744d70FDBE2Ba4CF95131626614a1763DF805B9E") {
    token.decimals = 18;
    token.name = "SNT";
    token.symbol = "Status Network Token";
  } else if (address == "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F") {
    token.decimals = 18;
    token.name = "SNX";
    token.symbol = "Synthetix Network Token";
  } else if (address == "0x09fE5f0236F0Ea5D930197DCE254d77B04128075") {
    token.decimals = 18;
    token.name = "WCK";
    token.symbol = "Wrapped CryptoKitties";
  } else {
    token.decimals = 0;
    token.name = null;
    token.symbol = null;
  }

  /* Testnets */
  if (
    address == "0xf2d1f94310823fe26cfa9c9b6fd152834b8e7849" /* Goerli */ ||
    address == "0x7d669a64deb8a4a51eea755bb0e19fd39ce25ae9" /* Kovan */ ||
    address == "0xc3dbf84abb494ce5199d5d4d815b10ec29529ff8" /* Rinkeby */ ||
    address == "0x2d69ad895797c880abce92437788047ba0eb7ff6" /* Ropsten */
  ) {
    token.decimals = 18;
    token.name = "TestnetDAI";
    token.symbol = "DAI";
  }

  token.save();
}
