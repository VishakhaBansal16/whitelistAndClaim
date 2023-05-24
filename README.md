## Table of Contents

- [Task Description](#task-description)
- [Tasks Included](#tasks-included)
- [Technologies Included](#technologies-included)
- [Install and run](#install-and-run)
- [Hardhat Setup](#hardhat-setup)
- [Testing](#testing)
- [Solidity-coverage](#solidity-coverge)

## Task Description

- Smart contract for whitelisting wallet address by owner only.
- Claiming 1 token every 1 min by whitelisted users.
- Adding two events i.e, Whitelisted and Claimed.
- Event listening to print every whitelisted event and claimed event data.

## Technologies Included

- Solidity for smart contracts
- Hardhat for compiling, testing and deploying contract on testnet sepolia
- Chai framework for testing contract functions on hardhat
- ethers.js library to deploy contract and for event listening

## Install and Run

Run npm install to install required dependencies.

```
$ npm install
```

Run node index.js to run the application so that events can be listened in terminal.

```
$ node index.js
```

Now call the contract functions which is deployed on sepolia: 0xb57fE257A4617a0eb6972c392A7ba97462b7aCF8 and see emitted events in terminal.
This is how event data will be shown-

![emitted events image](./images/emittedEvents.png?raw=true)

## Hardhat Setup

Run npm install hardhat to install hardhat.

```
npm install hardhat
```

Run npm install '@nomiclabs/hardhat-etherscan' to install hardhat plugin for verifying contracts on etherscan.

```
npm install '@nomiclabs/hardhat-etherscan'
```

Run npm i @nomiclabs/hardhat-ethers to install plugin which brings Hardhat the Ethereum library ethers.js, which allows to interact with the Ethereum blockchain

```
Run npm i @nomiclabs/hardhat-ethers
```

Run npx hardhat to run the hardhat in application.

```
npx hardhat
```

This project demonstrates an hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

Try running some of the following tasks:

Run npx hardhat compile to compile all contracts.

```
npx hardhat compile
```

Run npx hardhat run scripts/deploy.js --network sepolia to deploy contracts on network sepolia.

```
npx hardhat run scripts/deploy.js --network sepolia
```

Run npx hardhat verify --network sepolia <deployed contract address> to verify the deployed contracts on network sepolia.

```
npx hardhat verify --network sepolia <deployed contract address>

```

Smart contract deployed on sepolia testnet:

## Testing

Run npx hardhat test --network hardhat for unit testing smart contract on hardhat

```
npx hardhat test
```

Expecting Test result.

```

  whitelistAndClaim
    ✔ Should able to mint ERC721 NFTs (77ms)
    ✔ only owner should whitelist an address (41ms)
    ✔ should not allow non-owners to whitelist an address (60ms)
    ✔ should not whitelist an already whitelisted address (39ms)
    ✔ should allow whitelisted account to claim tokens (91ms)
    ✔ should not allow non-whitelisted account to claim tokens
    ✔ should enforce claim interval between token claims (87ms)


  7 passing (6s)

```

## Solidity-coverage

Run npm i --save-dev solidity-coverage to install solidity-coverage

```
npm i --save-dev solidity-coverage
```

Require the plugin in hardhat.config.js

```
require('solidity-coverage')
```

Run npx hardhat coverage to perform solidity test-cases coverage.

```
npx hardhat coverage
```

You will see a report as shown below-

![solidity-coverage report image](./images/solidity-coverage-report.png?raw=true)
