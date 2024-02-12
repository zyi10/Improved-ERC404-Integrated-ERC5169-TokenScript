// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const [signer] = await hre.ethers.getSigners();
  const signerAddr = signer.address;

  console.log(`Address: ${signerAddr}`);

  let startBalance = await hre.ethers.provider.getBalance(signer.address);
  console.log(`deploy key balance ${hre.ethers.formatEther(startBalance)}`);

  //deploy contract
  const mintAddress = "0xe3Be9E2bbfbCf69a2E812fd495676983908F5E1c";

  const humanInterface = await hre.ethers.deployContract("HumanInterface", [mintAddress, mintAddress]);
  await humanInterface.waitForDeployment();

  let newBalance = await hre.ethers.provider.getBalance(signer.address);
  console.log(`deploy key balance ${hre.ethers.formatEther(newBalance)}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
