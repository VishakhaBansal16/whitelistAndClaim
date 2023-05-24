require("@nomiclabs/hardhat-etherscan");
const hre = require("hardhat");
async function main() {
  await hre.run("verify:verify", {
    address: "0xb57fE257A4617a0eb6972c392A7ba97462b7aCF8",
    constructorArguments: ["0x1ff1EA0a7F55BD4bBAf2a3C35EEbE63D921FcbEc"],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
