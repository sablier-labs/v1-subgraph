## Sablier Subgraph

**This is a beta version which runs on the Rinkeby testnet.**

[Sablier][sablier-repo] is a decentralised app for continuous payments on Ethereum. This repo was built using The Graph,
which is an absolutely fantastic tool for indexing data on Ethereum. [Here][smart-contract] is a link to the
smart contract deployed on Rinkeby.

## Testing

Head to this [URL][netlify-website]. You must use MetaMask and connect to Rinkeby.

You could use your own account, but it will take a while until you will be able to see your stream earning money. If you
want to see Sablier in action with a set of pre-generated streams, use
the following mnemonic: `bonus scheme citizen soft pretty elephant soap salmon brave velvet exhaust traffic`.

## Queries

As of right now, there are two big queries:

### Get Streams

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

### Get Raw Stream

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
[netlify-website]: https://kind-hypatia-292f09.netlify.com
[sablier-repo]: https://github.com/PaulRBerg/sablier
[sablier-twitter]: https://twitter.com/SablierApp
[smart-contract]: https://rinkeby.etherscan.io/address/0x32ef6010d97fc0d10f0d0ab842c141cbd266c98d
