// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title NFT
 * @dev A simple ERC721 NFT contract for minting and managing NFTs.
 */
contract NFT is ERC721 {
    /**
     * @dev Initializes the contract by setting the token name and symbol.
     */
    constructor() ERC721("ERC721NFT", "MyNFT") {}

    /**
     * @dev Safely mints a new NFT to the specified account.
     * @param account The address to receive the minted NFT.
     * @param tokenId The unique identifier of the NFT.
     */
    function safeMint(address account, uint256 tokenId) public {
        _safeMint(account, tokenId);
    }
}
