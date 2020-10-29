![saffron](saffron_finance_logo_black_on_white_180.png)
# Saffron
This is a monorepo for the Saffron smart contract system on Ethereum mainnet. 

Saffron is a protocol for tokenizing on-chain assets, including contracts that otherwise impair access to utilized capital. Tokenized ownership of on-chain assets gives liquidity providers greater flexibility and uninterrupted access to their underlying collateral while enabling leveraged staking and bespoke risk management.

https://saffron.finance

## Launch
Saffron is a launching with a web3 application: saffron.finance. The Saffron smart contracts (pool, token, adapter, and strategy) are deployed in standby mode on the Ethereum mainnet and are set to go live on October 31st, 2020 at 14:10:00 UTC. The first epoch begins exactly at that time.

## Spice tokens (SFI)
SFI tokens, or Spice tokens, are the native currency of Saffron driving all of its features, products, and incentive structures. 
Features of the SFI token:
* ERC-20 capped at 100,000 SFI.
* The first epoch will generate 40,000 tokens. Tokens are a subsidy for liquidity providers and are awarded to LPs via liquidity mining.
* SFI token subsidy is halved every epoch, up to and including epoch 7.
* Beginning on epoch 8, halving discontinues and SFI are steadily released at a rate of 200 tokens per epoch, until reaching the 100,000 cap or governance voting to change the emission schedule. 
* There are no fees in version 1, however, upon introduction of fees SFI staking will entitle stakers to a proportional share of fee revenue.
* Fees continue to provide incentives when SFI token generation ends. For example, SFI tokens must be staked before an LP can join the enhanced return A tranche.
* The team is allocated 25% of SFI subsidy minted per epoch.

## Epochs
Epochs are 14 days in length. Over the duration of an epoch liquidity providers earn interest on underlying platforms and mine SFI tokens. While liquidity is locked in the pool LPs may trade their Saffron LP tokens representing proportional ownership of the pool. When an epoch ends liquidity providers are able to remove their liquidity alongside SFI mined and interest earned.

Upon launch all liquidity will be added into the S tranche to kick off liquidity mining. The AA and A tranches will be enabled in the second epoch.

## Liquidity mining
Saffron is launching with DAI liquidity mining. All DAI added to the Saffron pool is deployed to Compound and earns interest. In future versions of the protocol additional currencies and platforms will be added dynamically. 
SFI is mined using the dsec (dollars per second) equation: 
```
dsec = dollar value * seconds 
```
Liquidity providers mint dsec tokens representing the dollar value of capital they've added to the pool multiplied by the number of seconds until the end of the current epoch. SFI generated at the end of the epoch are redeemable in proportion  to the total outstanding dsec tokens generated during that epoch. For example, if Alice owns 10% of outstanding dsec tokens then she receives 10% of the SFI subsidy. 

