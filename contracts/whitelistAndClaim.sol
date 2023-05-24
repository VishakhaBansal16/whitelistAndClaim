// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFT.sol";

/**
 * @title WhitelistAndClaim
 * @dev A contract for managing whitelisted accounts and token claiming.
 */
contract WhitelistAndClaim {
    address public owner;
    uint8 public claimInterval = 60;
    NFT private nftContract;
    uint256 nftTokenId = 0;
    mapping(address => bool) public whitelist;
    mapping(address => uint) public lastClaimed;

    event Whitelisted(address indexed account);
    event Claimed(address indexed account, uint256 tokenId, uint amount);

    /**
     * @dev Initializes the contract by setting the contract owner and the address of the associated NFT contract.
     * @param nftAddress The address of the deployed MyNFT contract.
     */
    constructor(address nftAddress) {
        owner = msg.sender;
        nftContract = NFT(nftAddress);
    }

    /**
     * @dev Modifier that only allows the contract owner to execute a function.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action.");
        _;
    }

    /**
     * @dev Modifier that only allows whitelisted accounts to execute a function.
     */
    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "You are not whitelisted to perform this action.");
        _;
    }

    /**
     * @dev Whitelists an address to allow it to perform whitelisted actions.
     * @param _account The address to be whitelisted.
     */
    function whitelistAddress(address _account) public onlyOwner {
        require(!whitelist[_account], "Address is already whitelisted.");
        whitelist[_account] = true;
        emit Whitelisted(_account);
    }

    /**
     * @dev Claims tokens by minting a new NFT to the caller if eligible.
     */
    function claimTokens() public onlyWhitelisted {
        require(block.timestamp >= lastClaimed[msg.sender] + claimInterval, "Claim interval of 1 minute has not passed yet.");
        lastClaimed[msg.sender] = block.timestamp;
        nftContract.safeMint(msg.sender, nftTokenId);
        nftTokenId += 1;
        emit Claimed(msg.sender, nftTokenId, 1);
    }
}
