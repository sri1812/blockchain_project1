// migrations/2_fund.js
const Fund = artifacts.require("./Fund.sol");

const FINNEY = 10 ** 15;
const DAY = 3600 * 12;

module.exports = function(deployer) {
  deployer.deploy(Fund, DAY, 100 * FINNEY)

  // option 1 console log the address
  .then(() => console.log(Fund.address))

  // option 2 Retrieve the contract instance and get the address from that:

  .then(() => Fund.deployed())
  .then(_instance => console.log(_instance.address)); 
};