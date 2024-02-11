require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

let { PRIVATE_KEY, INFURA_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`, 
      accounts: [`${PRIVATE_KEY}`]
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`, 
      accounts: [`${PRIVATE_KEY}`]
    }
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  // sourcify: {
  //   enabled: true
  // },
  etherscan: {
    apiKey: "EW1H5FIX1HNIQW59MNXN6N6J7Q6QRQ43EK"
  }
};
