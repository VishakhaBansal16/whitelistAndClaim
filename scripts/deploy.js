require("dotenv").config();
const { ethers, upgrades } = require("hardhat");
async function main() {
  //deploying NFT.sol
  const MyContract = await ethers.getContractFactory("NFT");
  const myContract = await MyContract.deploy();
  await myContract.deployed();
  console.log("NFT contract deployed to the address: ", myContract.address);

  //deploying whitelistAndClaim.sol
  const Token = await ethers.getContractFactory("WhitelistAndClaim");
  const token = await Token.deploy(myContract.address);
  await token.deployed();
  console.log(
    "whitelistAndClaim contract deployed to the address: ",
    token.address
  );
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
