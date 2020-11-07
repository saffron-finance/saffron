#!/usr/bin/python

# Simulate staking pool actions
# When capital is added to the pool, the pool must be balanced in such a way that A tranche = AA/(tranche_A_multiplier+1)
# S tranche participants liquidity is used to fill up A or AA as needed as it comes in to the pool

# For example, imagine scenario:
#  tranche_A_multiplier = 10
#  S  = 30
#  AA = 1100
#  A  = 5
# Total possible deposit for someone with DAI into the AA tranche = MIN(((AA/(tranche_A_multiplier+1))-A), S)

# Define tranches 
Tranche = dict({"S": 0, "AA": 1, "A": 2})

tranche_A_multiplier = 10

tranche_utilized_balances = [
    0, # Tranche S cannot be utilized
    1000,
    100
]

tranche_unutilized_balances = [
    115,
    0,
    0
]

# If user's intention is A tranche, find the maximum amount we can put into the A tranche, take it from the user, and fill AA with S
user_intention = "A"  # User's intention is to add liquidity into this tranche
user_principal = 300  # User's initial principal they intend to deposit
user_deposit   = 0    # User's actual eventual deposit after tranche balancing algorithm runs
user_remainder = 0    # User's remainder base asset returned if user principal > intended tranche capacity

# Saffron add_liquidity function with the tranche balancing algorithm implemented
def add_liquidity_balanced(intention, principal):
    deposit  = 0
    change   = 0
    capacity = 0

    # Calculate capacity and change based on intention
    if intention == "S":
        deposit = principal
        tranche_unutilized_balances[Tranche["S"]] += deposit

    if intention == "AA":
        capacity = tranche_unutilized_balances[Tranche["S"]] * tranche_A_multiplier
        deposit = min(principal, capacity)
        tranche_unutilized_balances[Tranche["S"]]  -= deposit / tranche_A_multiplier
        tranche_unutilized_balances[Tranche["AA"]] += deposit
        tranche_unutilized_balances[Tranche["A"]]  += deposit / tranche_A_multiplier

    if intention == "A":
        capacity = tranche_unutilized_balances[Tranche["S"]] / tranche_A_multiplier
        deposit = min(principal, capacity)
        tranche_unutilized_balances[Tranche["S"]]  -= deposit * tranche_A_multiplier
        tranche_unutilized_balances[Tranche["AA"]] += deposit * tranche_A_multiplier
        tranche_unutilized_balances[Tranche["A"]]  += deposit

    if deposit < principal: change = principal - deposit

    print("User intention...", principal, intention)
    print("User deposit.....", deposit)
    print("Remainder........", change)
    display_contract_state()

# Simulate deploy_all_capital call from strategy
def deploy_all_capital():
    pass


# Display the contract state (utilized and unutilized capital)
def display_contract_state():
    print("utilized   [S, AA, A]: 0", tranche_utilized_balances[Tranche["AA"]], tranche_utilized_balances[Tranche["A"]])
    print("unutilized [S, AA, A]:", tranche_unutilized_balances[Tranche["S"]], tranche_unutilized_balances[Tranche["AA"]], tranche_unutilized_balances[Tranche["A"]])
    print()


display_contract_state()
add_liquidity_balanced("A", 1000)
add_liquidity_balanced("S", 1000)
add_liquidity_balanced("AA", 1000)
add_liquidity_balanced("AA", 10000)
add_liquidity_balanced("S", 100)
add_liquidity_balanced("A", 100)
