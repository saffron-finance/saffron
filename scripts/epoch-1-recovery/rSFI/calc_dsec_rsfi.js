const fs = require('fs');
const { Command } = require('commander');

const program = new Command();
program.version('1.0.0');
program
    .option('-i, --input <path_to_file>', 'Input path', '0x3Eef97-DistributionAInterest-log.json')
    .option('-o, --output <path_to_file>', 'Output path', '0x3Eef97-DistributionAInterest-rewards.json')
    .option('-t, --tranche <tranche_name>', 'Tranche name: S or A', 'A');
program.parse(process.argv);

//
// S DSec total = 46452195180327979283067900000000
// S Ratio = 10687500000000000000000 / 46452195180327979283067900000000
//
// A Dsec total = 2721051942671116842170000000000
// A Ratio = 562500000000000000000 / 2721051942671116842170000000000
const tranches =
    {
        A: {
            sfi_earned: 562500000000000000000,
            dsec_ratio: 206721522
        },
        S: {
            sfi_earned: 10687500000000000000000,
            dsec_ratio: 230075240
        }
    };

let rewards = [];

try {
    console.log(`Reading the file, ${program.input}.`);
    const data = fs.readFileSync(program.input, 'utf8');
    const redeems = JSON.parse(data);
    console.log(`Redeem events count: ${redeems.length}`);

    redeems.forEach(redeem => {
        const sfi_wei_reward = (redeem.balance * tranches[program.tranche].dsec_ratio) / 10**18;
        const sfi_reward = sfi_wei_reward / 10**18;
        rewards.push({ sendto: redeem.sender, reward_sfi_wei: sfi_wei_reward, reward_sfi: sfi_reward});
    })

    console.log(`Writing to file, ${program.output}.`);
    fs.writeFileSync(program.output, JSON.stringify(rewards, null, 2));
} catch (err) {
    console.error(err);
    process.exit(1);
}
