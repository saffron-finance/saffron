const { Command } = require('commander');
const { projectId } = require('./secrets.json');
const Web3 = require("web3");
const fs = require('fs');

// Program options
const program = new Command();
program.version('1.0.0');
program
    .option('-f, --fromblock <block number>', 'Block number to start reading events')
    .option('-t, --toblock <block number>', 'Block number to read events to');
program.parse(process.argv);

// Web3
const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${projectId}`);
const contractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"share","type":"uint256"}],"name":"Redeem","type":"event"},{"inputs":[],"name":"DAI","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"S_INTEREST_EARNED","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allowRedeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit_done","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"disallowRedeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_to","type":"address"}],"name":"erc_sweep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fund_rescue","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lp_token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lp_token_address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"redeem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"redeem_allowed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_fund_rescue","type":"address"}],"name":"setFundRescue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"total_distribution_amount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"underlying_token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

// Block number program globals
var fomBlock;
var toBlock; 

// LP token addresses
let addresses = {
    '0xFdbd256C0736d79E0082e9a4055A971cb12A296b': 'DistributionSInterest',
    '0xf65B60d127671ACec535c359640ad390C2411577': 'DistributionSPrincipal',
    '0x3Eef976C092271bF557cb3Db26420aCdD25B8449': 'DistributionAInterest',
    '0xb6f4d51F72279e353432fF8E47BB3904e506A403': 'DistributionAPrincipal'
}

// Read in emitted event log from deployed web3 contract on the Ethereum blockchain
async function retrieveEvents(contractAddress) {
    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    return contract.getPastEvents('Redeem',
        {
            fromBlock: fromBlock,
            toBlock: toBlock
        });
}

// Process an event log
async function processItem(item) {
    return {
        sender: item.returnValues.sender,
        balance: item.returnValues.balance.toString(),
        token: item.returnValues.token,
        share: item.returnValues.share,
        transactionHash: item.transactionHash
    }
}

// Process & write events to a file
async function writeRedeemEvents() {
    // Block number setup
    fromBlock = program.fromblock ? program.fromblock : 11374859;
    toBlock = program.toblock ? program.toblock : (await web3.eth.getBlockNumber());
    console.log(`Reading from block, ${fromBlock}, to block, ${toBlock}.`);

    for (const addressesKey in addresses) {
        let redeemEvents = await retrieveEvents(addressesKey);
        console.log(`${redeemEvents.length} Redeem events for contract, ${addresses[addressesKey]}.`);
        let redeemList = [];
        for (const event of redeemEvents) {
            let processedItem = await processItem(event);
            redeemList.push(processedItem);
        }

        let logName = `event_log/${addressesKey}-${addresses[addressesKey]}-log.json`;
        fs.writeFile(logName, JSON.stringify(redeemList, null, 2), (err) => {
            if (err) throw err;
            console.log(`Completed writing to ${logName}`);
        });
    }
}

writeRedeemEvents().then(() => {
    console.log("done");
})
