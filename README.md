## Sablier Subgraph

The Graph is a tool that helps dApps index their event data so that users don't have to wait hours or even days for the
website to load.

In this repo, you can find the Sablier Subgraph, which is a collection of schemas and event handlers that
translate the data broadcast on the Ethereum blockchain in GraphQL form. Later on, the UI will parse the data and show
it to the users.

You may also want to check out the main Sablier [monorepo][sablier-monorepo].

## Queries

As of right now, there is one subscription and two big queries.

### Last Raw Stream

After the user creates a stream, they should be redirected to the profile page. To get there, you need the raw stream
id, therefore we wrote a subscription that listens to the most recent stream that has the `startBlock` greater than the
current block number on Ethereum.

```graphql
subscription LastRawStream($blockNumber: BigInt!, $sender: String!) {
  rawStreams(first: 1, where: { sender: $sender, startBlock_gte: $blockNumber }) {
    id
    startBlock
  }
}
```

### Streams

Sablier shows data differently based on whether you are the either the sender or the recipient of a stream. Because of
that, I had to duplicate the raw data and add a parent object on top of it.

The following information is used in the dashboard page. When the user selects an item from the list, the `rawStream`
data is loaded in the profile page.

```graphql
query Streams($owner: String!) {
  streams(orderBy: timestamp, orderDirection: desc, where: { owner: $owner }) {
    id
    flow
    owner
    rawStream {
      id
      interval
      payment
      recipient
      redemption {
        id
        recipientAmount
        senderAmount
      }
      sender
      startBlock
      stopBlock
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
        timestamp
      }
      withdrawals {
        id
        amount
      }
    }
    timestamp
  }
}
```

### Stream

Used in the stream profile page.

```graphql
query Stream($streamId: ID!) {
  stream(id: $streamId) {
    id
    flow
    rawStream {
      id
      interval
      payment
      recipient
      redemption {
        id
        recipientAmount
        senderAmount
      }
      sender
      startBlock
      stopBlock
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
        timestamp
      }
      withdrawals {
        id
        amount
      }
    }
  }
}
```

[sablier-monorepo]: https://github.com/SablierApp/sablier
