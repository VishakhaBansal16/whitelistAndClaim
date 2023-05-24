const ethers = require("ethers");
const ABI = require("../ABI.js");
const provider = new ethers.providers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/d88f8ee2170d497d847bf35f1a78f1c7"
);

const address = "0xb57fE257A4617a0eb6972c392A7ba97462b7aCF8";

const contract = new ethers.Contract(address, ABI, provider);

export const events = async () => {
  contract.on("Whitelisted", async (account, event) => {
    const details = {
      transaction: event.event,
      account: account,
      txHash: event.transactionHash,
    };
    console.log(details);
  });

  contract.on("Claimed", async (account, tokenId, amount, event) => {
    const details = {
      transaction: event.event,
      account: account,
      tokenId: tokenId,
      amount: amount,
      txHash: event.transactionHash,
    };
    console.log(details);
  });
};
