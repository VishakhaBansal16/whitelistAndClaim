const { ethers, upgrades } = require("hardhat");
const { expect } = require("chai");
let owner;
let user;
let user1;
let nftContract;
let whitelistAndClaim;
describe("whitelistAndClaim", function () {
  beforeEach(async () => {
    const [Owner, User, User1] = await ethers.getSigners();
    owner = Owner;
    user = User;
    user1 = User1;
    //deploying NFT.sol
    const NFTContract = await ethers.getContractFactory("NFT");
    nftContract = await NFTContract.deploy();
    await nftContract.deployed();

    //deploying whitelistAndClaim.sol
    const WhitelistAndClaim = await ethers.getContractFactory(
      "WhitelistAndClaim"
    );
    whitelistAndClaim = await WhitelistAndClaim.deploy(nftContract.address);
    await whitelistAndClaim.deployed();
  });

  it("Should able to mint ERC721 NFTs", async function () {
    await nftContract.connect(user).safeMint(user.address, 0);
    expect(await nftContract.balanceOf(user.address)).to.equal(1);
  });

  it("only owner should whitelist an address", async function () {
    await whitelistAndClaim.connect(owner).whitelistAddress(user.address);
    const isWhitelisted = await whitelistAndClaim.whitelist(user.address);
    expect(isWhitelisted).to.equal(true);
  });

  it("should not allow non-owners to whitelist an address", async function () {
    await expect(
      whitelistAndClaim.connect(user1).whitelistAddress(user.address)
    ).to.revertedWith("Only contract owner can perform this action.");
  });

  it("should not whitelist an already whitelisted address", async function () {
    await whitelistAndClaim.connect(owner).whitelistAddress(user.address);
    await expect(
      whitelistAndClaim.connect(owner).whitelistAddress(user.address)
    ).to.revertedWith("Address is already whitelisted.");
  });

  it("should allow whitelisted account to claim tokens", async function () {
    await whitelistAndClaim.connect(owner).whitelistAddress(user.address);
    expect(await nftContract.balanceOf(user.address)).to.equal(0);
    await whitelistAndClaim.connect(user).claimTokens();
    expect(await nftContract.balanceOf(user.address)).to.equal(1);
  });

  it("should not allow non-whitelisted account to claim tokens", async function () {
    await expect(whitelistAndClaim.connect(user).claimTokens()).to.revertedWith(
      "You are not whitelisted to perform this action."
    );
  });

  it("should enforce claim interval between token claims", async () => {
    await whitelistAndClaim.connect(owner).whitelistAddress(user.address);
    await whitelistAndClaim.connect(user).claimTokens();
    await expect(whitelistAndClaim.connect(user).claimTokens()).to.revertedWith(
      "Claim interval of 1 minute has not passed yet."
    );
  });
});
