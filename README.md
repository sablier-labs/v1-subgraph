# Sablier Subgraph

Sablier is a money streaming protocol running on top of EVM-compatible chains. This subgraph indexes the events emitted by our smart contracts.

You can interact with the subgraph via The Graph's hosted service:

- [sablierhq/sablier](https://thegraph.com/explorer/subgraph/sablierhq/sablier)
- [sablierhq/sablier-matic](https://thegraph.com/explorer/subgraph/sablierhq/sablier-matic)
- [sablierhq/sablier-bsc](https://thegraph.com/explorer/subgraph/sablierhq/sablier-bsc)

## Queries

Below are a few ways to show how to query the Sablier subgraph for data. The queries show most of the information that
is queryable, but there are many other filtering options that can be used. Just check out the GraphQL API.

### Querying All Streams

```graphql
{
  streams {
    id
    cancellation {
      recipientBalance
      timestamp
      txhash
    }
    deposit
    ratePerSecond
    recipient
    sender
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
