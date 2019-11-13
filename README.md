## Sablier Subgraph

The Graph is a tool that helps dapps index their blockchain data so that users don't have to wait hours or more for the
website to load.

This is our subgraph, a collection of schemas and event handlers that
parse the data broadcast on the Ethereum blockchain to GraphQL form. The dapp then gets the data to display
it to the end users.

Our smart contracts can be found in the [Sablier monorepo](https://github.com/sablierhq/sablier).

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
