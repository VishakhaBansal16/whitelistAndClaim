require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.infura.io/v3/d88f8ee2170d497d847bf35f1a78f1c7",
      accounts: [
        "52f2046c2002f0bd00adcebfc8cd45dcddd933eb47e9df34f2ec81386814a810",
      ],
    },
  },

  etherscan: {
    apiKey: {
      sepolia: "3EU1BFA7RYB6JS9CCFC6J6UQGBJ5DJD674",
    },
  },
  solidity: {
    version: "0.8.8",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
