const { projectId, mnemonic } = require('./secrets.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
      network_id: '*', // for truffle compliance
    },
    mainnet: {
      provider: () => new HDWalletProvider(
        mnemonic, `wss://mainnet.infura.io/ws/v3/${projectId}`
      ),
      networkId: 1,
      network_id: 1,
      networkCheckTimeout: 10000000,
      gasPrice: 79e9
    },
    kovan: {
      provider: () => new HDWalletProvider(
        mnemonic, `wss://kovan.infura.io/ws/v3/${projectId}`
      ),
      networkId: 42,
      network_id: 42,
      websockets: true,
      networkCheckTimeout: 10000000,
      gasPrice: 1e9
    },
  },
  compilers: {
    solc: {
      version: "0.7.4",
      "settings": {
        optimizer: {
          enabled: true, // Default: false
          runs: 999999   // Default: 200
        }
      }
    }
  }
};
