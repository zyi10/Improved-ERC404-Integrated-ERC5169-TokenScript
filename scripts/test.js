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

  const human404Address = "0xb66520b4d7872f646f6700401aeeebff24cde097";

  console.log(`Address: ${signerAddr}`);

  let startBalance = await hre.ethers.provider.getBalance(signer.address);
  console.log(`deploy key balance ${hre.ethers.formatEther(startBalance)}`);

  const Human404 = await ethers.getContractFactory('HumanInterface');
  let human404 = await Human404.attach(human404Address);

  const tokenAmountToSend = hre.ethers.parseEther("3.2"); //sending 3.2 ERC20
  const holderAddress = "0xA20efc4B9537d27acfD052003e311f762620642D";

  const secondHolder =  "0xe3Be9E2bbfbCf69a2E812fd495676983908F5E1c";

  console.log(`Amount to send: ${tokenAmountToSend}`);

  let getOwner = await human404.connect(signer).owner();
  console.log(`Owner ${getOwner}`);

  let tokenURL = await human404.connect(signer).tokenURI(1);
  console.log(`URL: ${tokenURL}`);

  let tokenBal = await human404.connect(signer).erc20BalanceOf(secondHolder);
  console.log(`Bal: ${tokenBal} ${hre.ethers.formatEther(tokenBal)}`);

  let nftBal = await human404.connect(signer).erc721BalanceOf(secondHolder);
  console.log(`NFT Bal: ${nftBal}`);

  let ownedNFTs = await human404.connect(signer).owned(secondHolder);
  console.log(`NFTs owned:`);

  for(let i = 0; i < ownedNFTs.length; i++) {
    console.log(ownedNFTs[i].toString());
  }

  //test send, this will dump all NFTs that sender will "lose" if they transfer 3.2 ERC20 tokens
  let getSendTokenIds = await human404.connect(signer).calculateERC721Transfers(secondHolder, tokenAmountToSend);

  console.log(`complete`);

  for(let i = 0; i < getSendTokenIds.length; i++) {
    console.log(getSendTokenIds[i].toString());
  }

  let newBalance = await hre.ethers.provider.getBalance(secondHolder);
  console.log(`deploy key balance ${hre.ethers.formatEther(newBalance)}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
