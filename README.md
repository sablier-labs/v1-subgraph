# Sablier Subgraph

This is our subgraph, a collection of GraphQL schemas and mappings that parse the events broadcast by the Sablier protocol
on the Ethereum blockchain.

Our smart contracts can be found in this [repository](https://github.com/sablierhq/sablier).

## Development

Before you can build, create and deploy this subgraph, you have to execute the following commands in the terminal:

```bash
$ yarn install
$ yarn prepare:mainnet
```

The first command installs all external dependencies, while the latter generates the `subgraph.yaml` file, which is
required by The Graph.

We use [Handlebars](https://github.com/wycats/handlebars.js/) to compile a [template subgraph](./subgraph.template.yaml) and add the parameters specific to each
network (Mainnet, Goerli, Kovan, Rinkeby, Ropsten). The network can be changed via the `NETWORK_NAME` environment
variable or directly by choosing a different "prepare" script. See [package.json](./package.json) for all options.

## Queries

### Querying All Streams

```graphql
{
  streams {
    id
    cancellation {
      recipientBalance
      recipientInterest
      timestamp
      txhash
    }
    deposit
    exchangeRateInitial
    ratePerSecond
    recipient
    recipientSharePercentage
    sender
    senderSharePercentage
    startTime
    stopTime
    timestamp
    token {
      id
      decimals
      name
      symbol
    }
    txs {
      id
      block
      event
      from
      timestamp
      to
    }
    withdrawals {
      id
      amount
    }
  }
}
```

### Querying All Transactions

```graphql
{
  transactions {
    id
    block
    event
    from
    stream {
      id
    }
    timestamp
    to
  }
}
```
