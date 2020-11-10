#!/usr/bin/python

# Define tranches for clearer code
Tranche = dict({"S": 0, "AA": 1, "A": 2})

# Tranche multiplier constant. Epoch 1 multiplier will be set to 10X yield
tranche_A_multiplier = 10

# Simulated contract state
tranche_utilized_balances = [ 0, 0, 0 ]
tranche_unutilized_balances = [ 0, 0, 0 ]
tranche_dsec = [ 0, 0, 0 ]
virtual_AA_utilized_balance   = 0
virtual_A_utilized_balance    = 0
virtual_AA_unutilized_balance = 0
virtual_A_unutilized_balance  = 0

# Reset contract state global variables
def set_globals(new_utilized, new_unutilized, virtual_balances):
    global virtual_AA_utilized_balance
    global virtual_A_utilized_balance
    global virtual_AA_unutilized_balance
    global virtual_A_unutilized_balance
    global tranche_utilized_balances
    global tranche_unutilized_balances
    if new_utilized is None: new_utilized = [0, 0, 0]
    if new_unutilized is None: new_unutilized = [0, 0, 0]
    if virtual_balances is None: virtual_balances = [0, 0, 0, 0]
    tranche_utilized_balances = new_utilized
    tranche_unutilized_balances = new_unutilized
    virtual_AA_utilized_balance   = virtual_balances[0]
    virtual_A_utilized_balance    = virtual_balances[1]
    virtual_AA_unutilized_balance = virtual_balances[2]
    virtual_A_unutilized_balance  = virtual_balances[3]
    print("======== globals reset ========")
    display_contract_state()

# Get amount of S available for consumption
def get_available_S_balance(utilization):
    if utilization == "utilized":
        return max(0, tranche_utilized_balances[Tranche["S"]] - (virtual_AA_utilized_balance + virtual_A_utilized_balance))
    return max(0, tranche_unutilized_balances[Tranche["S"]] - (virtual_AA_unutilized_balance + virtual_A_unutilized_balance))

# Saffron add_liquidity function with the tranche balancing algorithm implemented
# intention: User adds liquidity into this tranche
# principal: Capital added to the tranche from the user
def add_liquidity_balanced(intention, principal):
    global virtual_AA_utilized_balance
    global virtual_A_utilized_balance
    global virtual_AA_unutilized_balance
    global virtual_A_unutilized_balance
    global tranche_utilized_balances
    global tranche_unutilized_balances
    tranche_S_utilized_consumed   = 0
    tranche_S_unutilized_consumed = 0
    deposit     = 0
    change      = 0
    capacity    = 0
    consumed    = 0

    # Calculate capacity and change based on intention
    if intention == "S":
        deposit = principal
        tranche_unutilized_balances[Tranche["S"]] += deposit

    if intention == "AA":
        # Find capacity for S tranche to facilitate a deposit into AA. Deposit is min(principal, capacity): restricted by the user's capital or S tranche capacity
        capacity = (get_available_S_balance("utilized") + get_available_S_balance("unutilized")) * tranche_A_multiplier
        deposit = min(principal, capacity)            # Amount the user will deposit into AA
        consumed = deposit / tranche_A_multiplier     # Amount of S tranche consumed to provide to A
        
        if deposit > 0:
            # Determine the amount of tranche S utilized and tranche S unutilzied balance to consume
            # Always consume tranche S utilized balance first
            if consumed > get_available_S_balance("utilized"): 
                # Take capacity from tranche S utilized and tranche S unutilized and give virtual utilized/unutilized balances to A
                tranche_S_utilized_consumed = get_available_S_balance("utilized")
                tranche_S_unutilized_consumed = min(consumed, get_available_S_balance("unutilized"))
                virtual_A_utilized_balance += tranche_S_utilized_consumed
                virtual_A_unutilized_balance += tranche_S_unutilized_consumed
            else: 
                # Take capacity from tranche S utilized and give virtual utilized balance to A
                tranche_S_utilized_consumed = min(consumed, get_available_S_balance("utilized"))
                tranche_S_unutilized_consumed = 0
                virtual_A_utilized_balance += tranche_S_utilized_consumed
            
            tranche_unutilized_balances[Tranche["AA"]] += deposit
        else: print("Deposit evaluated to 0")

    if intention == "A":
        # Find capacity for S tranche to facilitate a deposit into A. Deposit is min(principal, capacity): restricted by the user's capital or S tranche capacity
        capacity = (get_available_S_balance("utilized") + get_available_S_balance("unutilized")) / tranche_A_multiplier
        deposit = min(principal, capacity)            # Amount the user will deposit into A
        consumed = deposit * tranche_A_multiplier     # Amount of S tranche consumed to provide to AA

        if deposit > 0:
            # Determine the amount of tranche S utilized and tranche S unutilzied balance to consume
            # Always consume tranche S utilized balance first
            if consumed > get_available_S_balance("utilized"): 
                # Take capacity from tranche S utilized and tranche S unutilized and give virtual utilized/unutilized balances to A
                tranche_S_utilized_consumed = get_available_S_balance("utilized")
                tranche_S_unutilized_consumed = min(consumed, get_available_S_balance("unutilized"))
                virtual_AA_utilized_balance += tranche_S_utilized_consumed
                virtual_AA_unutilized_balance += tranche_S_unutilized_consumed
            else: 
                # Take capacity from tranche S utilized and give virtual utilized balance to A
                tranche_S_utilized_consumed = min(consumed, get_available_S_balance("utilized"))
                tranche_S_unutilized_consumed = 0
                virtual_AA_utilized_balance += tranche_S_utilized_consumed

            tranche_unutilized_balances[Tranche["A"]] += deposit
        else: print("Deposit evaluated to 0")

    if deposit < principal: change = principal - deposit

    print("User intention......", principal, intention)
    print("User deposit........", deposit)
    print("Consumed[t, u, un]..", consumed, tranche_S_utilized_consumed, tranche_S_unutilized_consumed)
    print("Remainder...........", change)
    display_contract_state()
    return(deposit, change, capacity, consumed)

# Simulate deploy_all_capital call from strategy
def deploy_all_capital():
    global virtual_AA_utilized_balance
    global virtual_A_utilized_balance
    global virtual_AA_unutilized_balance
    global virtual_A_unutilized_balance
    global tranche_utilized_balances
    global tranche_unutilized_balances

    # Transfer unutilized balances to adapter (they become utilized)
    tranche_utilized_balances[0] += tranche_unutilized_balances[0]
    tranche_utilized_balances[1] += tranche_unutilized_balances[1]
    tranche_utilized_balances[2] += tranche_unutilized_balances[2]
    tranche_unutilized_balances = [ 0, 0, 0 ]

    # Transfer virtual balances of S tranche to adapter (they become utilized)
    virtual_AA_utilized_balance += virtual_AA_unutilized_balance
    virtual_A_utilized_balance  += virtual_A_unutilized_balance

    virtual_AA_unutilized_balance = 0
    virtual_A_unutilized_balance  = 0
    print(">> deploy_all_capital()")
    display_contract_state()

# Display the contract state, including S available capacity
def display_contract_state():
    print("utilized     [S, AA, A] :", tranche_utilized_balances[Tranche["S"]], tranche_utilized_balances[Tranche["AA"]], tranche_utilized_balances[Tranche["A"]])
    print("unutilized   [S, AA, A] :", tranche_unutilized_balances[Tranche["S"]], tranche_unutilized_balances[Tranche["AA"]], tranche_unutilized_balances[Tranche["A"]])
    print("vutilized    [AAu, Au]  :", virtual_AA_utilized_balance, virtual_A_utilized_balance)
    print("vunutilized  [AAun, Aun]:", virtual_AA_unutilized_balance, virtual_A_unutilized_balance)
    print("S available  [u, un]    :", get_available_S_balance("utilized"), get_available_S_balance("unutilized"))
    print()

# Simulate an add_liquidity call easily with global state, arguments for add_liquidity, an assertion check, and a message to output to the terminal
def simulate_add_liquidity(globalstate, args, assertion, message):
    if globalstate is None: 
        globalstate = [[], [], []]
        globalstate[0] = tranche_utilized_balances
        globalstate[1] = tranche_unutilized_balances
        globalstate[2] = [virtual_AA_utilized_balance, virtual_A_utilized_balance, virtual_AA_unutilized_balance, virtual_A_unutilized_balance]
    print(message)
    set_globals(globalstate[0], globalstate[1], globalstate[2])
    deposit, change, capacity, consumed = add_liquidity_balanced(args[0], args[1])
    assert (change==assertion[0] and capacity==assertion[1] and consumed==assertion[2]), AssertionError("add_liquidity returned unexpected value: ", deposit, change, capacity, consumed)


def simulate():
    simulate_add_liquidity([None, None, None], ["A", 10], [10, 0, 0], "** add_liquidity(A): no consumption possible (capacity limited by S balance), 100% remainder")
    simulate_add_liquidity([[1000, 0, 0], None, [1000, 0, 0, 0]], ["A", 10], [10, 0, 0], "** add_liquidity(A): no consumption possible (limited by virtual), 100% remainder")
    simulate_add_liquidity([[100, 0, 0], None, None], ["A", 10], [0, 10, 100], "** add_liquidity(A): only S utilized consumption, no remainder, fill 100% utilized")
    simulate_add_liquidity([[100, 0, 0], None, None], ["A", 5], [0, 10, 50], "** add_liquidity(A): only S utilized consumption, no remainder, partilly consumed")
    simulate_add_liquidity([[100, 0, 0], None, None], ["A", 11], [1, 10, 100], "** add_liquidity(A): only S utilized consumption, remainder")
    simulate_add_liquidity([[1000, 0, 0], None, [100, 0, 0, 0]], ["A", 10], [0, 90, 100], "** add_liquidity(A): only S utilized consumption, partial virtual, no remainder")
    simulate_add_liquidity([[150, 0, 0], None, [100, 0, 0, 0]], ["A", 10], [5, 5, 50], "** add_liquidity(A): only S utilized consumption, partial virtual, remainder")
    simulate_add_liquidity([[150, 0, 0], None, [100, 0, 0, 0]], ["A", 5], [0, 5, 50], "** add_liquidity(A): only S utilized consumption, partial virtual, consumed to exact utilized capacity, no remainder")
    simulate_add_liquidity([[150, 0, 0], None, [100, 0, 0, 0]], ["A", 999], [994, 5, 50], "** add_liquidity(A): only S utilized consumption, partial virtual, consumed to exact utilized capacity, remainder")
    simulate_add_liquidity([[150, 0, 0], None, [150, 0, 0, 0]], ["A", 999], [999, 0, 0], "** add_liquidity(A): only S utilized consumption, virtual full, 100% remainder")
    simulate_add_liquidity([[0, 0, 0], [500, 0, 0], None], ["A", 10], [0, 50, 100], "** add_liquidity(A): S zero utilized capacity, some unutilized consumed, no remainder")
    simulate_add_liquidity([[0, 0, 0], [500, 0, 0], None], ["A", 50], [0, 50, 500], "** add_liquidity(A): S zero utilized capacity, all unutilized consumed, no remainder")
    simulate_add_liquidity([[0, 0, 0], [500, 0, 0], None], ["A", 1000], [950, 50, 500], "** add_liquidity(A): S zero utilized capacity, all unutilized consumed, some remainder")
    simulate_add_liquidity([[1000, 0, 0], [500, 0, 0], [1000, 0, 0, 0]], ["A", 10], [0, 50, 100], "** add_liquidity(A): S zero utilized capacity (virtual filled all), some unutilized consumed, no remainder")
    simulate_add_liquidity([[1000, 0, 0], [500, 0, 0], [1000, 0, 0, 0]], ["A", 50], [0, 50, 500], "** add_liquidity(A): S zero utilized (virtual filled all), all unutilized consumed, no remainder")
    simulate_add_liquidity([[1000, 0, 0], [500, 0, 0], [1000, 0, 0, 0]], ["A", 1000], [950, 50, 500], "** add_liquidity(A): S zero utilized (virtual filled all), all unutilized consumed, some remainder")
    simulate_add_liquidity([[1000, 0, 0], [5000, 0, 0], [0, 0, 0, 0]], ["A", 200], [0, 600, 2000], "** add_liquidity(A): S u+un capacity consumed, un consumed halfway, no remainder")
    simulate_add_liquidity([[1000, 0, 0], [5000, 0, 0], [500, 0, 0, 0]], ["A", 200], [0, 550, 2000], "** add_liquidity(A): S u+un capacity consumed, u capacity partial virtual, un consumed halfway, no remainder")
    simulate_add_liquidity([[1000, 0, 0], [5000, 0, 0], [1000, 0, 0, 0]], ["A", 200], [0, 500, 2000], "** add_liquidity(A): S un capacity consumed, u capacity full virtual, un consumed halfway, no remainder")
    simulate_add_liquidity([[3500, 0, 0], [20000, 0, 0], [1000, 2500, 5000, 0]], ["A", 500], [0, 1500, 5000], "** add_liquidity(A): S un capacity consumed, u capacity full virtual, un filled half virtual, un consumed halfway, no remainder")
    simulate_add_liquidity([[3500, 0, 0], [20000, 0, 0], [1000, 2500, 5000, 0]], ["A", 1500], [0, 1500, 15000], "** add_liquidity(A): S un capacity consumed, u capacity full virtual, un filled half virtual, un 100% consumed half virtual, no remainder")

    deploy_all_capital()
    simulate_add_liquidity(None, ["A", 100], [100, 0, 0], "** add_liquidity(A): no capacity in S remaining")
    simulate_add_liquidity(None, ["S", 100], [0, 0, 0], "** add_liquidity(S): add liquidity to S tranche")
    simulate_add_liquidity(None, ["A", 1000], [990, 10, 100], "** add_liquidity(A): S tranche only has capacity for 10 DAI from A")
    simulate_add_liquidity(None, ["S", 1000], [0, 0, 0], "** add_liquidity(S): add liquidity to S tranche")
    simulate_add_liquidity(None, ["A", 100], [0, 100, 1000], "** add_liquidity(A): use up 100% of unutilized S tranche liquidity")
    simulate_add_liquidity(None, ["S", 1000], [0, 0, 0], "** add_liquidity(S): add liquidity to S tranche")
    deploy_all_capital()
    simulate_add_liquidity(None, ["A", 100], [0, 100, 1000], "** add_liquidity(A): use up 100% of utilized S tranche liquidity")
    deploy_all_capital()

simulate()
