# Saffron Tranche Balancing Algorithm Simulation
 2020-11-10 by psykeeper.eth

## Background
Lending pools in Saffron add LP's liquidity to underlying lending platforms. In the current version of Saffron, Compound is the first lending platform.
LPs can select between three tranches for their liquidity: S, AA, and A. The S tranche fills in liquidity where it's needed. 

AA is low risk, A is high risk.  When capital is added to a lending pool, the pool must be balanced in such a way that `A tranche = AA/(tranche_A_multiplier)`.

S tranche participants liquidity is used to fill up A or AA as needed as it comes in to the pool.

For epoch 1 (November 15th - November 30th) only the S tranche and A tranche exists (technically the AA and S tranches are the same here).

Example scenario:  
 tranche_A_multiplier = 10  
 S capacity = 30  
 AA = 1100  
 A  = 110  

Total possible deposit for someone with DAI into the AA tranche = `MIN(((AA/tranche_A_multiplier)-A), S)`

Glossary
========
**available**: S tranche capital combined availability for consumption between utilized and unutilized balances

**consumption**: S tranche capital consumed to facilitate add_liquidity into AA or A tranche

**deposit**: The amount of capital a user intends to add to the pool (some could be a remainder)

**intention**: The intended tranche the user wishes to add liquidity into

**remainder**: change given from the contract to the user (in case there isn't enough capacity in the S tranche to facilitate their deposit)

**tranche**: Tranches group capital by risk tolerance for Saffron to manage in its risk matching platform

**utilized**: Any capital in any tranche that is already deployed to a lending platform via an adapter

**unutilized**: Any capital in any tranche that is in the pool and not yet deployed to a lending platform

**virtual balance**: Virtual balances aggregate S tranche capacity consumed on behalf of another tranche.  For example, if an LP wants to add 10 DAI to the A tranche, the S tranche must consume 100 of its available DAI to facilitate that deposit.  At that point the S tranche will have 100 virtual AA balance.


## Example Scenarios
S tranche interest is the remainder of interest earned from AA and A.

Consider two scenarios:

----- Scenario 1 -----  
* S contributes 100 seconds with 2000 DAI = 200000 dsec, 2000 DAI earned in interest
* Someone adds liquidity to the A tranche with 50 seconds remaining. 100 DAI to the A tranche = 5000 dsec = 50*10 DAI earned in interest
* \> S tranche usage = 1000 DAI, S tranche vdsec_AA = 50000 
* Someone adds liquidity to the AA tranche with 10 seconds remaining. 100 DAI to the AA tranche = 1000 dsec = 10/10 DAI earned in interest
* \> S tranche usage = 10 DAI, S tranche vdsec_A = 100 

```
total interest earned = 2000 + 50 + 10 = 2060 DAI
tranche_S  users earned 1559 DAI (remainder)
tranche_AA users earned    1 DAI (10/10)
tranche_A  users earned  500 DAI (50*10)

tranche_S  LPs: produce 2000 DAI, lose 450 to pay out A, gain 9 from AA LPs, earns 1559 DAI
tranche_AA LPs: produce 10 DAI, 9 DAI sent from AA to S, earns 1 DAI
tranche_A  LPs: produce 50 DAI, 450 DAI sent from S to A, earns 500 DAI
1559 + 1 + 500 = 2060
```

----- Scenario 2 -----  
* S contributes 100 seconds with 2000 DAI = 200000 dsec, 2000 DAI earned in interest
* A contributes  50 seconds with  200 DAI =   1000 dsec, 100*10 DAI earned in interest
* \> S tranche usage = 100% (2000 DAI into AA) = 2000 * 50 = 100000 dsec into AA

```
Total interest earned = 2000 + 0 + 100
tranche_S  users earned 1100 DAI (remainder)
tranche_AA users earned    0 DAI (no LPs)
tranche_A  users earned 1000 DAI (100*10)

tranche_S  LPs: produce 2000 DAI, lose 900 to pay out A, earns 1100
tranche_AA LPs: do not exist in this epoch
tranche_A  LPs: produce 100 DAI, gain 900 from S, earns 1000    
```
