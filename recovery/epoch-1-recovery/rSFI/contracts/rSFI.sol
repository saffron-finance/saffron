// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

import "./lib/ERC20.sol";
import "./lib/SafeERC20.sol";

contract rSFI is ERC20 {
  using SafeERC20 for IERC20;

  address public governance;
  address public rSFI_minter;
  uint256 public constant MAX_TOKENS = 15489020891056530000000;

  constructor (string memory name, string memory symbol) ERC20(name, symbol) {
    // Initial governance is Saffron Deployer
    governance = msg.sender;
  }

  function mint_rSFI(address to, uint256 amount) public {
    require(msg.sender == rSFI_minter, "must be rSFI_minter");
    require(this.totalSupply() + amount < MAX_TOKENS, "cannot mint more than MAX_TOKENS");
    _mint(to, amount);
  }

  function set_minter(address to) external {
    require(msg.sender == governance, "must be governance");
    rSFI_minter = to;
  }

  function set_governance(address to) external {
    require(msg.sender == governance, "must be governance");
    governance = to;
  }

  event ErcSwept(address who, address to, address token, uint256 amount);
  function erc_sweep(address _token, address _to) public {
    require(msg.sender == governance, "must be governance");

    IERC20 tkn = IERC20(_token);
    uint256 tBal = tkn.balanceOf(address(this));
    tkn.safeTransfer(_to, tBal);

    emit ErcSwept(msg.sender, _to, _token, tBal);
  }
}
