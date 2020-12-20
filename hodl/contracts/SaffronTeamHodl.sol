// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

import "./lib/SafeMath.sol";
import "./lib/IERC20.sol";
import "./lib/SafeERC20.sol";
import "./SaffronLPBalanceToken.sol";

contract SaffronTeamHodl {
  using SafeMath for uint256;
  using SafeERC20 for IERC20;

  IERC20 public constant SFI = IERC20(address(0xb753428af26E81097e7fD17f40c88aaA3E04902c));
  uint256 public immutable creation_date;
  SaffronLPBalanceToken public lp_token;

  constructor(address lp_token_address) {
    require(lp_token_address != address(0x0), "can't use 0 address for LP token");
    lp_token = SaffronLPBalanceToken(lp_token_address);
    creation_date = block.timestamp;
  }

  event HodlSFI(address addr, uint256 amount);
  function hodl_SFI(uint256 amount) external {
    require(amount != 0, "can't hodl 0");
    SFI.safeTransferFrom(msg.sender, address(this), amount);
    lp_token.mint(msg.sender, amount);
    emit HodlSFI(msg.sender, amount);
  }

  event RedeemSFI(address addr, uint256 amount);
  function redeem_SFI(uint256 amount) external {
    require(amount != 0, "can't redeem 0");
    require(block.timestamp > (creation_date + 372 days), "must be more than 1 year from creation");
    require(lp_token.balanceOf(msg.sender) >= amount, "insufficient LP tokens to redeem SFI");
    lp_token.burn(msg.sender, amount);
    SFI.safeTransfer(msg.sender, amount);
    emit RedeemSFI(msg.sender, amount);
  }
}
