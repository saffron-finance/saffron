// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

import "./ERC20.sol";
import "./Ownable.sol";


contract MintableToken is ERC20, Ownable {

  constructor(string memory name, string memory symbol) ERC20(name, symbol) { }

  function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
  }
}
