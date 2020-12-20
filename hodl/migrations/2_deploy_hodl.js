const SaffronTeamHodl = artifacts.require('SaffronTeamHodl');
const SaffronLPBalanceToken = artifacts.require('SaffronLPBalanceToken');
const assets = require('../address_book.js');

module.exports = async function(deployer, network, accounts) {

  console.log("Deployer: " + accounts[0]);
  let sfi, team;
  let epoch_cycle_reset = false;
  team = assets[network]['TEAM'];
  sfi = assets[network]['SFI'];
  console.log("SFI loaded from address " + sfi + ' on ' + network);
  console.log("Team address: " + team);

  await deployer.deploy(SaffronLPBalanceToken, "Saffron Team HODL Token", "SAFF-HODL", {gas: 2500000});
  const lp_token = await SaffronLPBalanceToken.deployed();

  await deployer.deploy(SaffronTeamHodl, lp_token.address, {gas: 6000000});
  const team_hodl = await SaffronTeamHodl.deployed();

  await lp_token.set_governance(team_hodl.address, {gas: 80000});
  console.log("LP token at " + lp_token.address + " governance set to " + team_hodl.address);

  console.log("Migration complete.");
};
