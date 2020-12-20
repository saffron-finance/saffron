// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

import "./lib/ERC20.sol";

contract SaffronLPBalanceToken is ERC20 {
  address public pool_address;

  constructor (string memory name, string memory symbol) ERC20(name, symbol) {
    // Set pool_address to saffron pool that created token
    pool_address = msg.sender;
  }

  // Allow creating new tranche tokens
  function mint(address to, uint256 amount) public {
    require(msg.sender == pool_address, "must be pool");
    _mint(to, amount);
  }

  function burn(address account, uint256 amount) public {
    require(msg.sender == pool_address, "must be pool");
    _burn(account, amount);
  }

  function set_governance(address to) external {
    require(msg.sender == pool_address, "must be pool");
    pool_address = to;
  }
}
