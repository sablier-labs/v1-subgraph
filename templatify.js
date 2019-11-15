const Handlebars = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const yaml = require("js-yaml");

const { t } = require("typy");

function getNetworkNameForSubgraph() {
  switch (process.env.SUBGRAPH) {
    case undefined:
    case "sablierhq/sablier":
      return "mainnet";
    case "sablierhq/sablier-kovan":
      return "kovan";
    case "sablierhq/sablier-rinkeby":
      return "rinkeby";
    case "sablierhq/sablier-ropsten":
      return "ropsten";
    default:
      return null;
  }
}

(async () => {
  const networksFilePath = path.join(__dirname, "networks.yaml");
  const networks = yaml.load(await fs.readFile(networksFilePath, { encoding: "utf-8" }));

  const networkName = process.env.NETWORK_NAME || getNetworkNameForSubgraph();
  const network = t(networks, networkName).safeObject;
  if (t(network).isFalsy) {
    throw new Error('Please provide a "network" argument');
  }

  const subgraphTemplateFilePath = path.join(__dirname, "subgraph.template.yaml");
  const source = await fs.readFile(subgraphTemplateFilePath, "utf-8");
  const template = Handlebars.compile(source);
  const result = template(network);
  await fs.writeFile(path.join(__dirname, "subgraph.yaml"), result);

  console.log("🎉 subgraph.yaml successfully generated");
})();
