const { Command } = require('commander');
const { projectId } = require('./secrets.json');
const Web3 = require("web3");
const fs = require('fs');

const program = new Command();
program.version('1.0.0');
program
    .option('-i, --input <path_to_file>', 'Input path', '0x3Eef97-DistributionAInterest-log.json')
    .option('-o, --output <path_to_file>', 'Output path', '0x3Eef97-DistributionAInterest-rewards.json')
    .option('-t, --tranche <tranche_name>', 'Tranche name: S or A', 'A');
program.parse(process.argv);

// Web3
const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${projectId}`);
const lpTokenABI = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool_address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"set_governance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

const deadAddress = '0x000000000000000000000000000000000000dEaD';

// LP token addresses
let addresses = {
    '0x372Bc201134676c846F1fd07a2a059Fd18526De3': 'Saffron LP epoch 1 S DAI dsec',
    '0x28DcafcbF29A502B33a719d726B0E723A73b6AD3': 'Saffron LP epoch 1 A DAI dsec',
    '0x8364Cf2bc1504e05EfEd9b92Ee903b642B6f3Fb5': 'Saffron LP epoch 1 A DAI principal'
}
//
// S DSec total = 46452195180327979283067900000000
// S Ratio = 10687500000000000000000 / 46452195180327979283067900000000
//
// A Dsec total = 2721051942671116842170000000000
// A Ratio = 562500000000000000000 / 2721051942671116842170000000000
const one_ether = web3.utils.toBN('1000000000000000000');
const tranches =
    {
        A: {
            sfi_earned: web3.utils.toBN('562500000000000000000'),
            dsec_ratio: web3.utils.toBN('206721522'),
            dsec_token_address: "0x28DcafcbF29A502B33a719d726B0E723A73b6AD3"
        },
        S: {
            sfi_earned: web3.utils.toBN('10687500000000000000000'),
            dsec_ratio: web3.utils.toBN('230075240'),
            dsec_token_address: "0x372Bc201134676c846F1fd07a2a059Fd18526De3"
        }
    };

let rewards = [];

async function calculateSFI() {
  try {
    console.log(`Reading the file, ${program.input}.`);
    const data = fs.readFileSync(program.input, 'utf8');
    const redeems = JSON.parse(data);
    console.log(`Redeem events count: ${redeems.length}`);
    let totalSFI = web3.utils.toBN('0');

    redeems.forEach(redeem => {
      const sfi_wei_reward = (web3.utils.toBN(redeem.balance).mul(tranches[program.tranche].dsec_ratio)).div(one_ether);
      //const sfi_reward = sfi_wei_reward / 10**18;
      rewards.push({ sendto: redeem.sender, reward_sfi_wei: sfi_wei_reward.toString() });
      totalSFI = totalSFI.add(sfi_wei_reward)
    })

    const contract = new web3.eth.Contract(lpTokenABI, tranches[program.tranche].dsec_token_address);
    //const totalSupply = await contract.methods.totalSupply.call();
    const totalSupply = web3.utils.toBN((await contract.methods.totalSupply().call().catch((e)=>{ console.log(`Error LP token totalSupply: ${e.message}`); })));
    const deadBalance = web3.utils.toBN((await contract.methods.balanceOf(deadAddress).call().catch((e)=>{ console.log(`Error LP token balanceOf: ${e.message}`); })));
    const delta = totalSupply.sub(deadBalance).mul(tranches[program.tranche].dsec_ratio).div(one_ether);
    const totalPlusDelta = totalSFI.add(delta);
    console.log(`Total rSFI counted:  ${totalSFI.toString()}`);
    console.log(`dsec totalSupply:  ${totalSupply.toString()}`);
    console.log(`remaining balance:  ${totalSupply.sub(deadBalance).toString()}`);
    console.log(`delta (rSFI + delta should match sfi_earned):  ${totalSFI.toString()} + ${delta} = ${totalPlusDelta} [${tranches[program.tranche].sfi_earned}]`);
    console.log(`Writing to file, ${program.output}`);
    fs.writeFileSync(program.output, JSON.stringify(rewards, null, 2));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

calculateSFI().then(() => {
  console.log("done");
});

