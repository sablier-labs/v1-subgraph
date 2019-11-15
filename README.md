## Sablier Subgraph

The Graph is a tool that helps dapps index their blockchain data so that users don't have to wait hours or more for the
website to load.

This is our subgraph, a collection of schemas and event handlers that
parse the data broadcast on the Ethereum blockchain to GraphQL form.

Our smart contracts can be found in the [Sablier monorepo](https://github.com/sablierhq/sablier).

## Contributing

Before you can build, create and deploy this subgraph, you have to execute the following commands in the terminal:

```bash
$ yarn
$ SUBGRAPH=sablierhq/sablier yarn run prepare:subgraph
```

The first command installs all external dependencies, while the latter generates the `subgraph.yaml` file, which is
required by The Graph.

We use [Handlebars](https://github.com/wycats/handlebars.js/) to compile a [template subgraph](./subgraph.template.yaml) and add the parameters specific to each
network (Mainnet, Goerli, Kovan, Rinkeby, Ropsten). See the [templatify.js](./templatify.js) file for all possibles values for `SUBGRAPH`.

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
