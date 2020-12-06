const { Command } = require('commander');
const { projectId } = require('./secrets.json');
const Web3 = require("web3");
const fs = require('fs');

const program = new Command();
program.version('1.0.0');
program
    .option('-i, --input <path_to_file>', 'Input path', '0xb6f4d5-DistributionAPrincipal-log.json')
    .option('-o, --output <path_to_file>', 'Output path', '0xb6f4d5-DistributionAPrincipal-rewards.json');
program.parse(process.argv);

const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${projectId}`);
const lpTokenABI = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool_address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"set_governance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

const deadAddress = '0x000000000000000000000000000000000000dEaD';

// LP token addresses
let addresses = {
    '0x372Bc201134676c846F1fd07a2a059Fd18526De3': 'Saffron LP epoch 1 S DAI dsec',
    '0x28DcafcbF29A502B33a719d726B0E723A73b6AD3': 'Saffron LP epoch 1 A DAI dsec',
    '0x8364Cf2bc1504e05EfEd9b92Ee903b642B6f3Fb5': 'Saffron LP epoch 1 A DAI principal'
}
const one_ether = web3.utils.toBN('1000000000000000000');
let rewards = [];


async function calculateSFI() {
  try {
    console.log(`Reading the file, ${program.input}.`)
    const data = fs.readFileSync(program.input, 'utf8')
    const redeems = JSON.parse(data)
    console.log(`Redeem events count: ${redeems.length}`)

    let totalSFI = web3.utils.toBN('0');
    redeems.forEach(redeem => {
      const sfi_wei_reward = web3.utils.toBN(redeem.balance).div(web3.utils.toBN('1000'))
      rewards.push({ sendto: redeem.sender, reward_sfi_wei: sfi_wei_reward })
      totalSFI = totalSFI.add(sfi_wei_reward)
    })
    const contract = new web3.eth.Contract(lpTokenABI, '0x8364Cf2bc1504e05EfEd9b92Ee903b642B6f3Fb5');
    //const totalSupply = await contract.methods.totalSupply.call();
    const totalSupply = web3.utils.toBN((await contract.methods.totalSupply().call().catch((e)=>{ console.log(`Error LP token totalSupply: ${e.message}`); })));
    const deadBalance = web3.utils.toBN((await contract.methods.balanceOf(deadAddress).call().catch((e)=>{ console.log(`Error LP token balanceOf: ${e.message}`); })));
    const delta = (totalSupply.sub(deadBalance)).div(web3.utils.toBN('1000'));
    const totalPlusDelta = totalSFI.add(delta);
    console.log(`Total rSFI counted:  ${totalSFI}`);
    console.log(`dead balance      :  ${deadBalance}`);
    console.log(`dsec totalSupply  :  ${totalSupply}`);
    console.log(`remaining balance :  ${delta}`);
    console.log(`delta (rSFI + delta should match sfi_earned):  ${totalSFI} + ${delta} = ${totalPlusDelta} [${totalSupply.div(web3.utils.toBN('1000'))}]`);

    console.log(`Writing to file, ${program.output}`);
    fs.writeFileSync(program.output, JSON.stringify(rewards, null, 2))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
calculateSFI().then(() => {
  console.log("done");
});

