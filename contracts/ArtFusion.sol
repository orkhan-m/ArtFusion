// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BasicNFT is ERC721 {
    uint256 private s_tokenCounter;
    mapping(uint256 => string) private s_tokenIdToUri;
    mapping(address => uint256) public usersNFTs;

    // create NFT Name & Symbol
    constructor() ERC721("Dogie", "DOG") {
        s_tokenCounter = 0;
    }

    // mint NFT
    function mintNFT(string memory tokenUri) public {
        s_tokenIdToUri[s_tokenCounter] = tokenUri;
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++;
    }

    // override token URI
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
        require(tokenIds.length >= 2, "Must burn at least two NFTs");

        // Check ownership and burn each NFT
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            require(
                ownerOf(tokenId) == msg.sender,
                "You do not own this token"
            );
            _burn(tokenId);
            delete s_tokenIdToUri[tokenId]; // Remove URI mapping of burned tokens

            // Mint a new NFT with the provided URI
            s_tokenIdToUri[s_tokenCounter] = newTokenUri;
            _safeMint(msg.sender, s_tokenCounter);
            s_tokenCounter++;
        }
    }
}
