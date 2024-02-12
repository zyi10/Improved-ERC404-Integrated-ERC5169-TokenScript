// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fetch = require("node-fetch");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const [signer] = await hre.ethers.getSigners();
  const signerAddr = signer.address;

  //const human404Address = "0x949fa48f3f21570bdaa04d891337f45be79db49d";

  console.log(`Address: ${signerAddr}`);

  let startBalance = await hre.ethers.provider.getBalance(signer.address);
  console.log(`deploy key balance ${hre.ethers.formatEther(startBalance)}`);

  const Human404 = await ethers.getContractFactory('HumanInterface');
  let human404 = await Human404.attach(human404Address);

  const tokenAmountToSend = hre.ethers.parseEther("3.2"); //sending 3.2 ERC20
  const holderAddress = "0xA20efc4B9537d27acfD052003e311f762620642D";

  const secondHolder =  "0xe3Be9E2bbfbCf69a2E812fd495676983908F5E1c";
  const human404Address = "0x949fa48f3f21570bdaa04d891337f45be79db49d";
  const sepProvider = new ethers.JsonRpcProvider("https://ethereum-sepolia.publicnode.com", {
  				chainId: 11155111,
  				name: "sepolia"
			});

			const tResolver = new ethers.Contract(human404Address, [
      			'function owned(address owner) view returns (uint256[] memory)',
      			'function tokenURI(uint256 tokenId) view returns (string memory)'
    		], sepProvider);

            let dudeAddr = "0x0c6e7f5e40fc654423e00f9c73dda496e2c704b8";

			nfts = [];

			const ownedNFTs = await tResolver.owned(dudeAddr);
			for(let i = 0; i < ownedNFTs.length; i++) {
				console.log(ownedNFTs[i].toString());
				//fetch each NFT
				const nftMetaData = await tResolver.tokenURI(ownedNFTs[i]);
				console.log(`Metadata URL: ${nftMetaData}`);

                //fetch metadata
                const nftsRequest = await fetch(convertIpfsUrl(nftMetaData));
    
                let nftMetadataJSON = await nftsRequest.json();

				const nftName = nftMetadataJSON.name;
				const nftImage = nftMetadataJSON.image_url;

				let nftData = {name: nftName, image: nftImage, tokenId: ownedNFTs[i] };
				nfts.push(nftData);

                console.log(`Name: ${nftData.name} : ${nftData.image}`);
			}

  const whiteList = "0x4FAe779c2101B3D8cF8BA4365f19d772eF678EB7";
  const whiteList2 = "0x8349Fc69c48aF23e030A655736375d8942De5347";
  //let makeWhiteList = await human404.connect(signer).setWhitelist(whiteList2, true);
  //let txReciept = await makeWhiteList.wait();
  //console.log(`tx ${txReciept.hash}`);

  console.log(`Amount to send: ${tokenAmountToSend}`);

  let getOwner = await human404.connect(signer).owner();
  console.log(`Owner ${getOwner}`);

  let tokenURL = await human404.connect(signer).tokenURI(1);
  console.log(`URL: ${tokenURL}`);

  let decimals = await human404.connect(signer).decimals();
  console.log(`decimals: ${decimals}`);

  let tokenBal = await human404.connect(signer).erc20BalanceOf(secondHolder);
  console.log(`Bal: ${tokenBal} ${hre.ethers.formatEther(tokenBal)}`);

  let defTokenBal = await human404.connect(signer).balanceOf(secondHolder);
  console.log(`defTokenBal: ${defTokenBal} ${hre.ethers.formatEther(defTokenBal)}`);

  let nftBal = await human404.connect(signer).erc721BalanceOf(secondHolder);
  console.log(`NFT Bal: ${nftBal}`);

  let ownedNFTs2 = await human404.connect(signer).owned(secondHolder);
  console.log(`NFTs owned:`);

  for(let i = 0; i < ownedNFTs2.length; i++) {
    console.log(ownedNFTs2[i].toString());
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

function convertIpfsUrl(ipfsUrl) {
    return ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
