import { Token } from "../types/schema";

function translate(payload: [Token, number, string, string]): void {
  payload[0].decimals = payload[1];
  payload[0].name = payload[2];
  payload[0].symbol = payload[3];
}

export function addToken(address: string): void {
  let token = Token.load(address);
  if (token != null) {
    return;
  }

  /* Mainnet */
  token = new Token(address);

  switch (address) {
    case "0x06af07097c9eeb7fd685c692751d5c66db49c215": {
      translate([token, 18, "Chai", "CHAI"]);
      break;
    }
    case "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643": {
      translate([token, 8, "Compound Dai", "cDAI"]);
      break;
    }
    case "0x39aa39c021dfbae8fac545936693ac917d5e7563": {
      translate([token, 8, "Compound USD Coin", "cUSDC"]);
      break;
    }
    case "0xea0bea4d852687c45fdc57f6b06a8a92302baabc": {
      translate([token, 18, "Counsel", "CNSL"]);
      break;
    }
    case "0x6b175474e89094c44da98b954eedeac495271d0f": {
      translate([token, 18, "Dai Stablecoin", "DAI"]);
      break;
    }
    case "0x493c57c4763932315a328269e1adad09653b9081": {
      translate([token, 18, "Fulcrum DAI iToken", "iDAI"]);
      break;
    }
    case "0xf013406a0b1d544238083df0b93ad0d2cbe0f65f": {
      translate([token, 6, "Fulcrum USDC iToken", "iUSDC"]);
      break;
    }
    case "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359": {
      translate([token, 18, "Sai Stablecoin v1.0", "SAI"]);
      break;
    }
    case "0x67ab11058ef23d0a19178f61a050d3c38f81ae21": {
      translate([token, 18, "Self Token", "SELF"]);
      break;
    }
    case "0x57ab1e02fee23774580c119740129eac7081e9d3": {
      translate([token, 18, "Synth sUSD", "sUSD"]);
      break;
    }
    case "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
      translate([token, 6, "USD Coin", "USDC"]);
      break;
    }
    case "0x58b6a8a3302369daec383334672404ee733ab239": {
      translate([token, 18, "Livepeer Token", "LPT"]);
      break;
    }
    case "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": {
      translate([token, 8, "Wrapped Bitcoin", "wBTC"]);
      break;
    }
    case "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
      translate([token, 18, "Wrapped Ether", "wETH"]);
      break;
    }
    /**
     *
     * New tokens
     *
     */
    case "0x960b236A07cf122663c4303350609A66A7B288C0": {
      translate([token, 18, "Aragon Network Token", "ANT"]);
      break;
    }
    case "0x0D8775F648430679A709E98d2b0Cb6250d2887EF": {
      translate([token, 18, "Basic Attention Token", "BAT"]);
      break;
    }
    case "0xdd974D5C2e2928deA5F71b9825b8b646686BD200": {
      translate([token, 18, "Kyber Network Crystal", "KNC"]);
      break;
    }
    case "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942": {
      translate([token, 18, "Decentraland MANA", "MANA"]);
      break;
    }
    case "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2": {
      translate([token, 18, "Maker", "MKR"]);
      break;
    }
    case "0x4575f41308EC1483f3d399aa9a2826d74Da13Deb": {
      translate([token, 18, "Orchid", "OXT"]);
      break;
    }
    case "0x408e41876cCCDC0F92210600ef50372656052a38": {
      translate([token, 18, "Republic Token", "REN"]);
      break;
    }
    case "0x744d70FDBE2Ba4CF95131626614a1763DF805B9E": {
      translate([token, 18, "Status Network Token", "SNT"]);
      break;
    }

    case "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F": {
      translate([token, 18, "Synthetix Network Token", "SNX"]);
      break;
    }
    case "0x09fE5f0236F0Ea5D930197DCE254d77B04128075": {
      translate([token, 18, "Wrapped CryptoKitties", "WCK"]);
      break;
    }
    case "0x1C5857e110CD8411054660F60B5De6a6958CfAE2": {
      translate([token, 18, "Reserve", "RSV"]);
      break;
    }
    case "0x8762db106B2c2A0bccB3A80d1Ed41273552616E8": {
      translate([token, 18, "Reserve Rights", "RSR"]);
      break;
    }

    default: {
      translate([token, 0, null, null]);
    }
  }

  /* Testnets */
  if (
    address == "0xf2d1f94310823fe26cfa9c9b6fd152834b8e7849" /* Goerli */ ||
    address == "0x7d669a64deb8a4a51eea755bb0e19fd39ce25ae9" /* Kovan */ ||
    address == "0xc3dbf84abb494ce5199d5d4d815b10ec29529ff8" /* Rinkeby */ ||
    address == "0x2d69ad895797c880abce92437788047ba0eb7ff6" /* Ropsten */
  ) {
    translate([token, 18, "TestnetDAI", "DAI"]);
  }

  token.save();
}
