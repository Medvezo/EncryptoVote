require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

// console.log(`Using address: 0x${process.env.PRIVATE_KEY}`);
// console.log(`Connecting to network: ${process.env.LINEA_SEPOLIA_API_KEY}`);

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.LINEA_SEPOLIA_API_KEY}`,
      account: [process.env.PRIVATE_KEY]
    }
  }
};


/*module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: "https://polygon-mainnet.g.alchemy.com/v2/zIYNO0hH93w2HY6qDD8xKsgX51dYxaT8"
      }
    }
  }
};
*/