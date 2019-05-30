## Sablier Subgraph

**This is a beta version which runs on the Rinkeby testnet.**

[Sablier][sablier-repo] is a decentralised app for continuous payments on Ethereum. This repo was built using The Graph,
which is a fantastic tool for indexing data on Ethereum. [Here][smart-contract] is a link to the
smart contract deployed on Rinkeby.

## Testing

Head to this [URL][netlify-website]. You must use MetaMask and connect to Rinkeby. Furthermore, you must use this mock
ERC-20 [contract][rinkeby-dai] and mint your own tokens (there is a function that allows anyone to mint an infinite supply).

You could use your own account, but, due to the reasons enumerated above, it may be easier to use this mnemonic: `bonus scheme citizen soft pretty elephant soap salmon brave velvet exhaust traffic`.

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

## Known Issues

- Links do not point to the Rinkeby version of Etherscan
- There is a small but noticeable delay when making a transaction and waiting for the receipt to be returned
- Sometimes, time is not calculated properly and it might be off by a few minutes or even more

## Links

- [Monorepo][sablier-repo]
- [ERC-1620][erc-1620]
- [Twitter][sablier-twitter]

[erc-1620]: http://eips.ethereum.org/EIPS/eip-1620
[netlify-website]: https://infallible-visvesvaraya-6d594e.netlify.com
[rinkeby-dai]: https://rinkeby.etherscan.io/address/0x8ad3aa5d5ff084307d28c8f514d7a193b2bfe725
[sablier-repo]: https://github.com/SablierApp/sablier
[sablier-twitter]: https://twitter.com/SablierApp
[smart-contract]: https://rinkeby.etherscan.io/address/0x32ef6010d97fc0d10f0d0ab842c141cbd266c98d
