import { Token } from "../types/schema";

export function addToken(address: string): void {
  let token = Token.load(address);
  if (token != null) {
    return;
  }

  /* Mainnet */
  token = new Token(address);

  if (address == "0x960b236a07cf122663c4303350609a66a7b288c0") {
    token.name = "Aragon Network Token";
    token.symbol = "ANT";
    token.decimals = 18;
  } else if (address == "0x0d8775f648430679a709e98d2b0cb6250d2887ef") {
    token.name = "Basic Attention Token";
    token.symbol = "BAT";
    token.decimals = 18;
  } else if (address == "0xf67c3000943c74186b64a1bc84cb5880e5198661") {
    token.name = "CHF36 Stablecoin";
    token.symbol = "CHF36";
    token.decimals = 18;
  } else if (address == "0x06af07097c9eeb7fd685c692751d5c66db49c215") {
    token.name = "Chai";
    token.symbol = "CHAI";
    token.decimals = 18;
  } else if (address == "0x514910771af9ca656af840dff83e8264ecf986ca") {
    token.name = "ChainLink Token";
    token.symbol = "LINK";
    token.decimals = 18;
  } else if (address == "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643") {
    token.name = "Compound Dai";
    token.symbol = "cDAI";
    token.decimals = 8;
  } else if (address == "0x39aa39c021dfbae8fac545936693ac917d5e7563") {
    token.name = "Compound USD Coin";
    token.symbol = "cUSDC";
    token.decimals = 8;
  } else if (address == "0xb4272071ecadd69d933adcd19ca99fe80664fc08") {
    token.name = "Crypto Franc";
    token.symbol = "XCHF";
    token.decimals = 18;
  } else if (address == "0x6b175474e89094c44da98b954eedeac495271d0f") {
    token.name = "Dai Stablecoin";
    token.symbol = "DAI";
    token.decimals = 18;
  } else if (address == "0x0f5d2fb29fb7d3cfee444a200298f468908cc942") {
    token.name = "Decentraland MANA";
    token.symbol = "MANA";
    token.decimals = 18;
  } else if (address == "0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf") {
    token.name = "Digix Gold Token";
    token.symbol = "DGX";
    token.decimals = 9;
  } else if (address == "0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9") {
    token.name = "Donut";
    token.symbol = "DONUT";
    token.decimals = 18;
  } else if (address == "0x0cde550b066ff98da123377eeb0a149607c9ca17") {
    token.name = "EUR36 Stablecoin";
    token.symbol = "EUR36";
    token.decimals = 18;
  } else if (address == "0x4946fcea7c692606e8908002e55a582af44ac121") {
    token.name = "FOAM Token";
    token.symbol = "FOAM";
    token.decimals = 18;
  } else if (address == "0x493c57c4763932315a328269e1adad09653b9081") {
    token.name = "Fulcrum DAI iToken";
    token.symbol = "iDAI";
    token.decimals = 18;
  } else if (address == "0xf013406a0b1d544238083df0b93ad0d2cbe0f65f") {
    token.name = "Fulcrum USDC iToken";
    token.symbol = "iUSDC";
    token.decimals = 6;
  } else if (address == "0x6810e776880c02933d47db1b9fc05908e5386b96") {
    token.name = "Gnosis";
    token.symbol = "GNO";
    token.decimals = 18;
  } else if (address == "0x10ec0d497824e342bcb0edce00959142aaa766dd") {
    token.name = "IdleDAI";
    token.symbol = "IDLEDAI";
    token.decimals = 18;
  } else if (address == "0xeb66acc3d011056b00ea521f8203580c2e5d3991") {
    token.name = "IdleUSDC";
    token.symbol = "IDLEUSDC";
    token.decimals = 18;
  } else if (address == "0xdd974d5c2e2928dea5f71b9825b8b646686bd200") {
    token.name = "Kyber Network Crystal";
    token.symbol = "KNC";
    token.decimals = 18;
  } else if (address == "0x58b6a8a3302369daec383334672404ee733ab239") {
    token.name = "Livepeer Token";
    token.symbol = "LPT";
    token.decimals = 18;
  } else if (address == "0xdf2c7238198ad8b389666574f2d8bc411a4b7428") {
    token.name = "Mainframe Token";
    token.symbol = "MFT";
    token.decimals = 18;
  } else if (address == "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2") {
    token.name = "Maker";
    token.symbol = "MKR";
    token.decimals = 18;
  } else if (address == "0xec67005c4e498ec7f55e092bd1d35cbc47c91892") {
    token.name = "Melon Token";
    token.symbol = "MLN";
    token.decimals = 18;
  } else if (address == "0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2") {
    token.name = "Meta";
    token.symbol = "MTA";
    token.decimals = 18;
  } else if (address == "0xe2f2a5c287993345a840db3b0845fbc70f5935a5") {
    token.name = "mStable USD";
    token.symbol = "mUSD";
    token.decimals = 18;
  } else if (address == "0xc92e74b131d7b1d46e60e07f3fae5d8877dd03f0") {
    token.name = "Minereum";
    token.symbol = "MNE";
    token.decimals = 8;
  } else if (address == "0x1776e1f26f98b1a5df9cd347953a26dd3cb46671") {
    token.name = "Numeraire";
    token.symbol = "NMR";
    token.decimals = 18;
  } else if (address == "0x4575f41308ec1483f3d399aa9a2826d74da13deb") {
    token.name = "Orchid";
    token.symbol = "OXT";
    token.decimals = 18;
  } else if (address == "0x8e870d67f660d95d5be530380d0ec0bd388289e1") {
    token.name = "Paxos";
    token.symbol = "PXT";
    token.decimals = 18;
  } else if (address == "0x408e41876cccdc0f92210600ef50372656052a38") {
    token.name = "Republic Token";
    token.symbol = "REN";
    token.decimals = 18;
  } else if (address == "0x1985365e9f78359a9b6ad760e32412f4a445e862") {
    token.name = "Reputation";
    token.symbol = "REP";
    token.decimals = 18;
  } else if (address == "0x1a2d7c2b22a0b6ce314dcbc30ac236303303defa") {
    token.name = "Rupiah Token";
    token.symbol = "IDRTW";
    token.decimals = 18;
  } else if (address == "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359") {
    token.name = "Sai Stablecoin v1.0";
    token.symbol = "SAI";
    token.decimals = 18;
  } else if (address == "0x67ab11058ef23d0a19178f61a050d3c38f81ae21") {
    token.name = "Self Token";
    token.symbol = "SELF";
    token.decimals = 18;
  } else if (address == "0xa4bdb11dc0a2bec88d24a3aa1e6bb17201112ebe") {
    token.name = "Stable USD";
    token.symbol = "USDS";
    token.decimals = 6;
  } else if (address == "0x744d70fdbe2ba4cf95131626614a1763df805b9e") {
    token.name = "Status Network Token";
    token.symbol = "SNT";
    token.decimals = 18;
  } else if (address == "0x57ab1e02fee23774580c119740129eac7081e9d3") {
    token.name = "Synth sUSD";
    token.symbol = "sUSD";
    token.decimals = 18;
  } else if (address == "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f") {
    token.name = "Synthetix Network Token";
    token.symbol = "SNX";
    token.decimals = 18;
  } else if (address == "0x0000000000085d4780b73119b644ae5ecd22b376") {
    token.name = "TrueUSD";
    token.symbol = "TUSD";
    token.decimals = 18;
  } else if (address == "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48") {
    token.name = "USD Coin";
    token.symbol = "USDC";
    token.decimals = 6;
  } else if (address == "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599") {
    token.name = "Wrapped Bitcoin";
    token.symbol = "WBTC";
    token.decimals = 8;
  } else if (address == "0x09fe5f0236f0ea5d930197dce254d77b04128075") {
    token.name = "Wrapped CryptoKitties";
    token.symbol = "WCK";
    token.decimals = 18;
  } else if (address == "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") {
    token.name = "Wrapped Ether";
    token.symbol = "wETH";
    token.decimals = 18;
  } else if (address == "0x8ba6dcc667d3ff64c1a2123ce72ff5f0199e5315") {
    /** Social Money **/
    token.name = "Alex Masmej";
    token.symbol = "ALEX";
    token.decimals = 4;
  } else if (address == "0xdc8092aaf83e00ebf9b01a2e90b7b7ef867ba503") {
    token.name = "Calvin";
    token.symbol = "CALVIN";
    token.decimals = 4;
  } else if (address == "0xa809cedee9b61956c768eaa10272dd5e0fd1a985") {
    token.name = "Cami";
    token.symbol = "CAMI";
    token.decimals = 4;
  } else if (address == "0xea0bea4d852687c45fdc57f6b06a8a92302baabc") {
    token.name = "Counsel";
    token.symbol = "CNSL";
    token.decimals = 18;
  } else if (address == "0xe98b5f11897d42afd17185dd301bcb2d46389bf1") {
    token.name = "Dude";
    token.symbol = "DUDE";
    token.decimals = 4;
  } else if (address == "0xc1fb6c015fc535abd331d3029de76a62e412fb23") {
    token.name = "Forcer";
    token.symbol = "FORCER";
    token.decimals = 4;
  } else if (address == "0xdcfe18bc46f5a0cd0d3af0c2155d2bcb5ade2fc5") {
    token.name = "Hue";
    token.symbol = "HUE";
    token.decimals = 4;
  } else if (address == "0x3c35132d0b129f068fdfa65b2c4d265fa5d8cea6") {
    token.name = "Jonathan Joseph";
    token.symbol = "JJJ";
    token.decimals = 4;
  } else if (address == "0xe6710e0cda178f3d921f456902707b0d4c4a332b") {
    token.name = "Julien";
    token.symbol = "JULIEN";
    token.decimals = 4;
  } else if (address == "0x8f464bfe2292748a0fed58bb53d3838b4ce018b0") {
    token.name = "Kevin";
    token.symbol = "KEVIN";
    token.decimals = 4;
  } else if (address == "0xdb7eb3ede973665b1bb9f3016861e3255062e4ed") {
    token.name = "MNFT";
    token.symbol = "MNFT";
    token.decimals = 4;
  } else if (address == "0x8db6da2120b346faa7f206841f2fb005bbe0dfd8") {
    token.name = "Paul Razvan Berg";
    token.symbol = "PAUL";
    token.decimals = 4;
  } else if (address == "0x5a844590c5b8f40ae56190771d06c60b9ab1da1c") {
    token.name = "Ross Campbell Legal Engineering";
    token.symbol = "RCLE";
    token.decimals = 18;
  } else if (address == "0x27fd686db10e0ae047fe8fe1de9830c0e0dc3cfa") {
    token.name = "Scott";
    token.symbol = "SCOTT";
    token.decimals = 4;
  } else if (address == "0xbdbf67d9bcb35e2bb7e4951002c6d70013196972") {
    token.name = "Scott Stevenson Legal Engineering";
    token.symbol = "SSLE";
    token.decimals = 18;
  } else if (address == "0xca7a0be200c7de43438878eb54b8b5d31296fbd8") {
    token.name = "Stani";
    token.symbol = "STANI";
    token.decimals = 4;
  } else if (address == "0xd0bf154768b0f1f8cba50daa8960c285ce4c67f2") {
    token.name = "UrBen";
    token.symbol = "URBEN";
    token.decimals = 4;
  } else {
    token.name = null;
    token.symbol = null;
    token.decimals = 0;
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
