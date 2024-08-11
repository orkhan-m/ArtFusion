// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ArtFusion is ERC721Enumerable {
    uint256 private s_tokenCounter;
    mapping(uint256 => string) private s_tokenIdToUri;
    mapping(address => uint256) public usersNFTs;

    // create NFT Name & Symbol
    constructor() ERC721("ArtFusion", "ATF") {
        s_tokenCounter = 0;
    }

    // mint NFT
    function mintNFT(string memory tokenUri, address recipient) public {
        s_tokenIdToUri[s_tokenCounter] = tokenUri;
        _safeMint(recipient, s_tokenCounter);
        s_tokenCounter++;
    }

    // check token URI
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return s_tokenIdToUri[tokenId];
    }

    // tokenIds - array with all the tokens of the user
    function burnAndMintNew(
        uint256[] memory tokenIds,
        string memory newTokenUri
    ) public {
        require(tokenIds.length == 2, "Must burn two NFTs");

        // Check ownership and burn each NFT
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            require(
                ownerOf(tokenId) == msg.sender,
                "You do not own this token"
            );
            _burn(tokenId);
            delete s_tokenIdToUri[tokenId]; // Remove URI mapping of burned tokens
        }
        // Mint a new NFT with the provided URI
        s_tokenIdToUri[s_tokenCounter] = newTokenUri;
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++;
    }
}
