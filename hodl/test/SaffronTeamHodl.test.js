const {expectRevert, time, constants, BN} = require('@openzeppelin/test-helpers');
const gtt = require('ganache-time-traveler');
const ERC20 = artifacts.require('ERC20');
const SFI = artifacts.require('SFI');
const SaffronTeamHodl = artifacts.require('SaffronTeamHodl');
const SaffronLPBalanceToken = artifacts.require('SaffronLPBalanceToken');
const assets = require('../address_book.js');

contract('SaffronTeamHodlTest', function (accounts) {

  let network = 'development';
  let governance = assets[network]['TEAM'];
  let alice = accounts[0];
  let bob = accounts[1];
  let charlie = accounts[2];
  let danny = accounts[3];
  let snapshotIdTest;
  let snapshotIdPrimary;

  let contracts = {};

  before(async function () {
    contracts.sfi = await SFI.at(assets["development"]["SFI"]);
    snapshotIdPrimary = (await gtt.takeSnapshot())["result"];

    // Mint SFI with unlocked team address
    await contracts.sfi.set_minter(governance, {from: governance});
    let mint_amount = web3.utils.toWei('200', 'ether');
    for (let i = 0; i < 5; i++) await contracts.sfi.mint_SFI(accounts[i], mint_amount, {from: governance});

    // Get deployed contracts from migrations
    contracts.lp_token = await SaffronLPBalanceToken.deployed();
    contracts.team_hodl = await SaffronTeamHodl.deployed();
  });

  // Set up ganache time traveler
  beforeEach(async function () {
    snapshotIdTest = (await gtt.takeSnapshot())["result"];
    console.log(`----- BEGIN ${this.currentTest.fullTitle()} -----`)
  });
  afterEach(async function () {
    console.log(`----- END ${this.currentTest.fullTitle()} -----`)
    await gtt.revertToSnapshot(snapshotIdTest);
  });
  after(async function () {
    await gtt.revertToSnapshot(snapshotIdPrimary);
  });

  // Add SFI to hodl contract
  async function hodl_SFI(user, amount) {
    let lp_tokens_before = await contracts.lp_token.balanceOf(user);
    await contracts.sfi.approve(contracts.team_hodl.address, amount, {from: user});
    let result = await contracts.team_hodl.hodl_SFI(amount, {from: user});
    let lp_tokens_after = await contracts.lp_token.balanceOf(user);

    assert(lp_tokens_before.lt(lp_tokens_after), "lp tokens have not increased");
    console.log(user + " was minted " + lp_tokens_after.sub(lp_tokens_before).toString() + " LP tokens");
    let logs = result.logs;
    console.log(dmpBN(getEvent("HodlSFI", logs)));
  }

  // Remove SFI from hodl contract
  async function redeem_SFI(user, amount) {
    let result = await contracts.team_hodl.redeem_SFI(amount, {from: user});
    let logs = result.logs;
    console.log(dmpBN(getEvent("RedeemSFI", logs)));
  }

  // Get current block time
  async function getCurrentBlockTimestamp() {
    let current_block = await web3.eth.getBlockNumber();
    let block = await web3.eth.getBlock(current_block);
    return block.timestamp;
  }

  // == TESTS ==
  
  // Test add SFI to hodl contract
  it('test hodl_SFI', async function () {
    await hodl_SFI(alice, web3.utils.toWei('10', 'ether'));
  });

  // Test try to redeem SFI too early
  it('test redeem_SFI too early', async function () {
    await expectRevert(
      redeem_SFI(alice, web3.utils.toWei('5', 'ether')),
      `must be more than 1 year from creation`
    );
  });

  // Test try to redeem SFI after 1 year and 1 week
  it('test redeem_SFI', async function () {
    await hodl_SFI(alice, web3.utils.toWei('10', 'ether'));
    await time.increase(time.duration.days(375));
    await redeem_SFI(alice, web3.utils.toWei('5', 'ether'));
    await redeem_SFI(alice, web3.utils.toWei('5', 'ether'));
  });

  // Log printing helper functions
  function getEvent(event_name, logs) {
    for (let i = 0; i < logs.length; i++) {
      if (logs[i]['event'] === event_name) {
        return logs[i].args;
      }
    }
  }

  function dmpBN(obj) {
    for (const objKey in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, objKey)) {
        try {
          obj[objKey] = obj[objKey].toString()
        } catch (e) {
          // not a BN ;)
        }
      }
    }
    return obj
  }

  async function printLogs(contract, _fromBlock, _toBlock) {
    let logs = await contract.getPastEvents("allEvents", {fromBlock: _fromBlock, toBlock: _toBlock});
    for (log of logs) {
      let tmp = {}
      let allNum = true
      for (const property in log.returnValues) {
        // when using named event arguments filter the duplicate numerical keys
        if (Object.prototype.hasOwnProperty.call(log.returnValues, property) && !Number.isInteger(parseInt(property))) {
          allNum = false;
          tmp[property] = log.returnValues[property];
        }
      }
      console.log(log.event, allNum ? log.returnValues : tmp);
    }
  }

});

