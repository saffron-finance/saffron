const fs = require('fs');
const { Command } = require('commander');

const program = new Command();
program.version('1.0.0');
program
    .option('-i, --input <path_to_file>', 'Input path', '0xb6f4d5-DistributionAPrincipal-log.json')
    .option('-o, --output <path_to_file>', 'Output path', '0xb6f4d5-DistributionAPrincipal-rewards.json');
program.parse(process.argv);

let rewards = [];

try {
    console.log(`Reading the file, ${program.input}.`)
    const data = fs.readFileSync(program.input, 'utf8')
    const redeems = JSON.parse(data)
    console.log(`Redeem events count: ${redeems.length}`)

    redeems.forEach(redeem => {
        const sfi_wei_reward = redeem.balance / 1000
        const sfi_reward = sfi_wei_reward / 10**18
        rewards.push({ sendto: redeem.sender, reward_sfi_wei: sfi_wei_reward, reward_sfi: sfi_reward})
    })

    console.log(`Writing to file, ${program.output}`);
    fs.writeFileSync(program.output, JSON.stringify(rewards, null, 2))
} catch (err) {
    console.error(err)
    process.exit(1)
}
