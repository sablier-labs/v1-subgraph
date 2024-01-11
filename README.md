# Sablier V1 Subgraph

This is the subgraph of the Sablier V1 token streaming protocol, which is a legacy release. The most recent release is V2 and can be found [here](https://github.com/sablier-labs/v2-core). For more details about how Sablier works, check out our docs at [docs.sablier.com](https://docs.sablier.com)/.

You can interact with the subgraph using The Graph's hosted service:

- [sablier-labs/sablier](https://thegraph.com/explorer/subgraph/sablier-labs/sablier)
- [sablier-labs/sablier-arbitrum](https://thegraph.com/explorer/subgraph/sablier-labs/sablier-arbitrum)
- [sablier-labs/sablier-avalanche](https://thegraph.com/explorer/subgraph/sablier-labs/sablier-avalanche)
- [sablier-labs/sablier-bsc](https://thegraph.com/explorer/subgraph/sablier-labs/sablier-bsc)
- [sablier-labs/sablier-matic](https://thegraph.com/explorer/subgraph/sablier-labs/sablier-matic)
- [sablier-labs/sablier-optimism](https://thegraph.com/explorer/subgraph/sablier-labs/sablier-optimism)

## Queries

Below are a few ways to show how to query the Sablier V1 subgraph for data. The queries show most of the information that
is queryable, but there are many other filtering options that can be used. Just check out the GraphQL API.

### Query All Streams

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

### Query All Streams for a Particular User

You can do this with the [`where`](https://thegraph.com/docs/en/querying/graphql-api/#example-using-where) clause. Make sure that the user address is in lowercase:

```graphql
{
  streams(where: { sender: "0xcafe...beef" }) {
    id
  }
}
```

### Query All Transactions

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
