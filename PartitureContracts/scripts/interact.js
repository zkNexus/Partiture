const hre = require("hardhat");

async function main() {
  // Get command line arguments
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log("❌ Usage: node scripts/interact.js <CONTRACT_ADDRESS> <ACTION> [PARAMS...]");
    console.log("\nAvailable actions:");
    console.log("  info                           - Get contract info");
    console.log("  mint <to> <title> <composer>   - Mint a new sheet");
    console.log("  sheets <address>               - Get creator's sheets");
    console.log("  metadata <tokenId>             - Get sheet metadata");
    console.log("  public <offset> <limit>        - Get public sheets");
    process.exit(1);
  }

  const contractAddress = args[0];
  const action = args[1];

  console.log("🔗 Connecting to contract...");
  console.log(`Network: ${hre.network.name}`);
  console.log(`Contract: ${contractAddress}`);

  // Get the contract instance
  const PartitureNFT = await hre.ethers.getContractFactory("PartitureNFT");
  const contract = PartitureNFT.attach(contractAddress);

  // Get the signer
  const [signer] = await hre.ethers.getSigners();
  console.log(`Signer: ${signer.address}\n`);

  try {
    switch (action) {
      case "info":
        await getContractInfo(contract);
        break;
        
      case "mint":
        if (args.length < 5) {
          console.log("❌ Usage: node scripts/interact.js <CONTRACT_ADDRESS> mint <to> <title> <composer>");
          process.exit(1);
        }
        await mintSheet(contract, args[2], args[3], args[4]);
        break;
        
      case "sheets":
        if (args.length < 3) {
          console.log("❌ Usage: node scripts/interact.js <CONTRACT_ADDRESS> sheets <address>");
          process.exit(1);
        }
        await getCreatorSheets(contract, args[2]);
        break;
        
      case "metadata":
        if (args.length < 3) {
          console.log("❌ Usage: node scripts/interact.js <CONTRACT_ADDRESS> metadata <tokenId>");
          process.exit(1);
        }
        await getSheetMetadata(contract, args[2]);
        break;
        
      case "public":
        const offset = args[2] || "0";
        const limit = args[3] || "10";
        await getPublicSheets(contract, offset, limit);
        break;
        
      default:
        console.log(`❌ Unknown action: ${action}`);
        process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

async function getContractInfo(contract) {
  console.log("📋 Contract Information:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━");
  
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const currentTokenId = await contract.getCurrentTokenId();
  const owner = await contract.owner();
  
  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total Supply: ${totalSupply}`);
  console.log(`Current Token ID: ${currentTokenId}`);
  console.log(`Owner: ${owner}`);
}

async function mintSheet(contract, to, title, composer) {
  console.log("🎵 Minting new sheet...");
  console.log(`To: ${to}`);
  console.log(`Title: ${title}`);
  console.log(`Composer: ${composer}`);
  
  const tx = await contract.mintSheet(
    to,
    title,
    composer,
    "Classical", // genre
    `https://partiture.xyz/metadata/${Date.now()}`, // tokenURI
    true // isPublic
  );
  
  console.log(`Transaction: ${tx.hash}`);
  console.log("⏳ Waiting for confirmation...");
  
  const receipt = await tx.wait();
  console.log(`✅ Sheet minted! Gas used: ${receipt.gasUsed}`);
  
  // Get the token ID from the event
  const event = receipt.logs.find(log => {
    try {
      const parsedLog = contract.interface.parseLog(log);
      return parsedLog && parsedLog.name === "SheetMinted";
    } catch (e) {
      return false;
    }
  });
  
  if (event) {
    const parsedEvent = contract.interface.parseLog(event);
    console.log(`Token ID: ${parsedEvent.args.tokenId}`);
  }
}

async function getCreatorSheets(contract, creator) {
  console.log(`🎼 Sheets by ${creator}:`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  const tokenIds = await contract.getCreatorTokens(creator);
  
  if (tokenIds.length === 0) {
    console.log("No sheets found for this creator.");
    return;
  }
  
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    const metadata = await contract.getSheetMetadata(tokenId);
    
    console.log(`\nToken ${tokenId}:`);
    console.log(`  Title: ${metadata.title}`);
    console.log(`  Composer: ${metadata.composer}`);
    console.log(`  Genre: ${metadata.genre}`);
    console.log(`  Public: ${metadata.isPublic}`);
    console.log(`  Created: ${new Date(Number(metadata.createdAt) * 1000).toLocaleDateString()}`);
  }
}

async function getSheetMetadata(contract, tokenId) {
  console.log(`🎵 Sheet Metadata for Token ${tokenId}:`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  const metadata = await contract.getSheetMetadata(tokenId);
  const owner = await contract.ownerOf(tokenId);
  const tokenURI = await contract.tokenURI(tokenId);
  
  console.log(`Title: ${metadata.title}`);
  console.log(`Composer: ${metadata.composer}`);
  console.log(`Genre: ${metadata.genre}`);
  console.log(`Creator: ${metadata.creator}`);
  console.log(`Current Owner: ${owner}`);
  console.log(`Public: ${metadata.isPublic}`);
  console.log(`Created: ${new Date(Number(metadata.createdAt) * 1000).toISOString()}`);
  console.log(`Token URI: ${tokenURI}`);
}

async function getPublicSheets(contract, offset, limit) {
  console.log(`🌐 Public Sheets (${offset}-${parseInt(offset) + parseInt(limit)}):`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  const [tokenIds, metadataArray] = await contract.getPublicSheets(offset, limit);
  
  if (tokenIds.length === 0) {
    console.log("No public sheets found in this range.");
    return;
  }
  
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    const metadata = metadataArray[i];
    
    console.log(`\nToken ${tokenId}:`);
    console.log(`  Title: ${metadata.title}`);
    console.log(`  Composer: ${metadata.composer}`);
    console.log(`  Genre: ${metadata.genre}`);
    console.log(`  Creator: ${metadata.creator}`);
    console.log(`  Created: ${new Date(Number(metadata.createdAt) * 1000).toLocaleDateString()}`);
  }
}

main()
  .then(() => {
    console.log("\n✅ Interaction completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Interaction failed:");
    console.error(error);
    process.exit(1);
  });