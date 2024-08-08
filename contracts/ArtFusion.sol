// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtFusion is ERC721, Ownable {
    uint256 public mintPrice = 0.0001 ether;
    uint256 public totalSupply;
    uint256 public maxSupply;
    bool public isMintEnables;
    mapping(address => uint256) public mintedWallets;

    constructor() payable ERC721("ArtFusion", "AFN") Ownable(msg.sender) {
        maxSupply = 2;
    }

    function toggleIsMintEnabled() external onlyOwner {}
}
