const { Command } = require('commander');
const { projectId } = require('./secrets.json');
const readline = require('readline');
const fs = require('fs');
const Web3 = require("web3");
const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${projectId}`);

const program = new Command();
program.version('1.0.0');
program
    .option('-i, --input <path_to_file>', 'Input path', 'A_dsec.csv')
program.parse(process.argv);

let total = web3.utils.toBN('0');

const readInterface = readline.createInterface({
  input: fs.createReadStream(`deploy/${program.input}`),
  //output: process.stdout,
  console: false
});

readInterface.on('line', function(line) {
  let index = line.indexOf(',');
  let address = line.substr(0, index);
  let wei = line.substr(index+1, line.length);
  let fromWei = web3.utils.fromWei(wei, 'ether'); 
  //console.log(wei);
  console.log(`${address}, ${fromWei}`)
  //process.stdout.write(.toString())
  //console.log(web3.utils.fromWei(wei, 'ether'));
  total = total.add(web3.utils.toBN(wei));
});

readInterface.on('close', function() {
  console.log(`${total}`);
});

