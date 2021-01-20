# rSFI
rSFI is a token representing redeemable SFI from the stuck epoch 1 pool at a 1:1 basis. rSFI will be airdropped to epoch 1 LPs periodically as LP token (dsec/principal) redemptions happen via the epoch 1 FundRescue contracts.

rSFI will be redeemable for SFI on January 24th, 2021 at 14:00 UTC. rSFI will be burned to redeem SFI.

Please see here for more information about Saffron epoch 1 recovery and the FundRescue contract:

- https://github.com/saffron-finance/epoch1-recovery
- https://app.saffron.finance/#recover
- https://medium.com/saffron-finance/saffron-epoch-1-recovery-d10b84c95940


## Scripts to Generate rSFI for Epoch 1 Recovery

Below are the scripts necessary to generate rSFI 

### Extract the Redeem events
```shell script
cd $PROJECT_ROOT/scripts/epoch-1-recovery/rSFI
vim secrets.json
npm install
node get_redeem_distributions.js --fromblock 11374859 --toblock 11394311
```

```shell script
Usage: node get_redeem_distributions.js [options]

Options:
  -V, --version                   output the version number
  -f, --fromblock <block number>  Block number to start reading events
  -t, --toblock <block number>    Block number to read events to (default to web3.eth.getBlockNumber())
  -h, --help                      display help for command

```

Output is written these files:

```text
0x3Eef97-DistributionAInterest-log.json   0xf65B60-DistributionSPrincipal-log.json
0xb6f4d5-DistributionAPrincipal-log.json  0xFdbd25-DistributionSInterest-log.json
```

Example format is:

```json
[
  {
    "sender": "0x09E9FF67d9D5A25Fa465Db6f0bEdE5560581f8Cb",
    "balance": "250000000000000000000",
    "token": "0x8364Cf2bc1504e05EfEd9b92Ee903b642B6f3Fb5",
    "share": "250000000000000000000",
    "transactionHash": "0xe1d2da66b0bc0c74d013160eda605da657f7136d5ffd67a2a92e1a9fcb33fbb4"
  },
  {
    "sender": "0x9B99828f8D8EA5D3008428991F70395BD8D361c9",
    "balance": "2000000000000000000000",
    "token": "0x8364Cf2bc1504e05EfEd9b92Ee903b642B6f3Fb5",
    "share": "2000000000000000000000",
    "transactionHash": "0xc2f84f3ead142d38c6dcc55966c3f85c87be42f336c7123ed6086865d4c5444d"
  },
  {
    "sender": "0xD51d953b017E6F2Fc76446b0e6bA26e271305952",
    "balance": "10000000000000000000000",
    "token": "0x8364Cf2bc1504e05EfEd9b92Ee903b642B6f3Fb5",
    "share": "10000000000000000000000",
    "transactionHash": "0x0443b57a16659d6be503c92e1c47d4afdd8f008a5d34a61a10f29d5b73f416c1"
  },
// ...
]
```

### Generate rSFI Values

```shell
$ node calc_desc_rsfi.js --help
Usage: calc_dsec_rsfi [options]

Options:
  -V, --version                 output the version number
  -i, --input <path_to_file>    Input path (default: "0x3Eef97-DistributionAInterest-log.json")
  -o, --output <path_to_file>   Output path (default: "0x3Eef97-DistributionAInterest-rewards.json")
  -t, --tranche <tranche_name>  Tranche name: S or A (default: "A")
  -h, --help                    display help for command

$ node calc_dsec_rsfi.js -i 0xFdbd25-DistributionSInterest-log.json -o 0xFdbd25-DistributionSInterest-reward.json -t S
$ node calc_dsec_rsfi.js -i 0x3Eef97-DistributionAInterest-log.json -o 0x3Eef97-DistributionAInterest-reward.json -t A
```

### Airdrop 3

```shell
node get_redeem_distributions.js --fromblock 11444115 --toblock 11682757

node calc_principal_rsfi.js -i event_log/0xb6f4d5-11444115-11682757-DistributionAPrincipal-log.json -o rSFI_generation/0xb6f4d5-11444115-11682757-DistributionAPrincipal-rSFI-3.json
Reading the file, event_log/0xb6f4d5-11444115-11682757-DistributionAPrincipal-log.json.
Redeem events count: 2
Total rSFI counted:  1000000000000000000
dead balance      :  4238915891056530000000000
dsec totalSupply  :  4239020891056530000000000
remaining balance :  105000000000000000
delta (rSFI + delta should match sfi_earned):  1000000000000000000 + 105000000000000000 = 1105000000000000000 [4239020891056530000000]
Writing to file, rSFI_generation/0xb6f4d5-11444115-11682757-DistributionAPrincipal-rSFI-3.json
done

node calc_dsec_rsfi.js -i event_log/0x3Eef97-11444115-11682757-DistributionAInterest-log.json -o rSFI_generation/0x3Eef97-11444115-11682757-DistributionAInterest-rSFI-3.json -t A
Reading the file, event_log/0x3Eef97-11444115-11682757-DistributionAInterest-log.json.
Redeem events count: 0
Total rSFI counted:  0
dsec totalSupply:  2721051942671116842170000000000
remaining balance:  127555230000000000000000000
delta (rSFI + delta should match sfi_earned):  0 + 26368411284660060 = 26368411284660060 [562500000000000000000]
Writing to file, rSFI_generation/0x3Eef97-11444115-11682757-DistributionAInterest-rSFI-3.json
done

node calc_dsec_rsfi.js -i event_log/0xFdbd25-11444115-11682757-DistributionSInterest-log.json -o rSFI_generation/0xFdbd25-11444115-11682757-DistributionSInterest-rSFI-3.json -t S
Reading the file, event_log/0xFdbd25-11444115-11682757-DistributionSInterest-log.json.
Redeem events count: 19
Total rSFI counted:  35416452826350504819
dsec totalSupply:  46452195180327979283067900000000
remaining balance:  92280591454492381070000000000
delta (rSFI + delta should match sfi_earned):  35416452826350504819 + 21231479226234283652 = 56647932052584788471 [10687500000000000000000]
Writing to file, rSFI_generation/0xFdbd25-11444115-11682757-DistributionSInterest-rSFI-3.json
done
```

The airdrop can be seen at [0xfca2a0556ecd35ae38476ac5223787d25a67eb5fc874dc3f1fb736ce029e7999](https://etherscan.io/tx/0xfca2a0556ecd35ae38476ac5223787d25a67eb5fc874dc3f1fb736ce029e7999)
