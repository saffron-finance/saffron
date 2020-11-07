#!/usr/bin/python

# This file represents a calculation done from the pool's perspective
# Information comes from two inputs: users' dsec and adapters reporting principal and interest
# Users, when adding liquidity, tell us how much they've added and we calculate their dsec
# Adapters can tell us their current principal balance and their interest earned

# Define tranches 
Tranche = dict({"S": 0, "AA": 1, "A": 2})

# Tranches earn a % of bi-weekly minted SFI 
TRANCHE_SFI_MULTIPLIER = [
    46.667,
    46.667,
    6.667
]

# Simulate tranches having an existing balance of base assets (in v1: only DAI)
# This is considered the principal for each tranche
tranche_principal = [
    30000,   # S
    2000,    # AA
    200      # A 
]

interest_rate = 0.03

# Simulate tranches having an existing balance of dsec (DAI * seconds until next removal window) 
tranche_dsec = [
    70000,   # S
    30000,   # AA
    10000    # A 
]

# Calculate total pool principal 
pool_principal = tranche_principal[Tranche["S"]] + tranche_principal[Tranche["AA"]] + tranche_principal[Tranche["A"]]
pool_dsec = tranche_dsec[0] + tranche_dsec[1] + tranche_dsec[2]
SFI_GENERATED = 30000
# SFI_GENERATION_HALVING = 2 weeks

# Calculate what % of minted SFI is owned by each tranche
tranche_SFI = [
    int(SFI_GENERATED * TRANCHE_SFI_MULTIPLIER[Tranche["S"]]  / 1e2),
    int(SFI_GENERATED * TRANCHE_SFI_MULTIPLIER[Tranche["AA"]] / 1e2),
    int(SFI_GENERATED * TRANCHE_SFI_MULTIPLIER[Tranche["A"]]  / 1e2)
]

print("pool_principal:", pool_principal)
print(tranche_SFI)

# Calculate user SFI earnings
def get_user_SFI_earnings(user_dsec, tranche):
    print("user with", user_dsec, "dsec attempting to withdraw SFI from tranche", tranche, "[", tranche_SFI[tranche], "SFI,", tranche_dsec[tranche], "dsec ]")
    return user_dsec / tranche_dsec[tranche] * tranche_SFI[tranche]
    
# Calculate user interest earned 
def get_user_interest_earned(user_dsec, tranche):
    print("user with", user_dsec, "dsec attempting to withdraw SFI from tranche", tranche, "[", tranche_principal[tranche] * interest_rate, "DAI,", tranche_dsec[tranche], "dsec ]")
    return user_dsec / tranche_dsec[tranche] * tranche_SFI[tranche]

print(get_user_SFI_earnings(100, Tranche["A"]))
print(get_user_SFI_earnings(250, Tranche["S"]))
print(get_user_SFI_earnings(100, Tranche["AA"]))
