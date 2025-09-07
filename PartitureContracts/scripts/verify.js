const hre = require("hardhat");

async function main() {
  // Get command line arguments
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log("❌ Usage: node scripts/verify.js <CONTRACT_ADDRESS> [DEPLOYER_ADDRESS]");
    console.log("Example: node scripts/verify.js 0x1234567890123456789012345678901234567890");
    process.exit(1);
  }

  const contractAddress = args[0];
  const deployerAddress = args[1] || process.env.DEPLOYER_ADDRESS;

  if (!deployerAddress) {
    const [deployer] = await hre.ethers.getSigners();
    deployerAddress = deployer.address;
  }

  console.log("🔍 Starting contract verification...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Network: ${hre.network.name}`);
  console.log(`Chain ID: ${hre.network.config.chainId}`);
  console.log(`Contract: ${contractAddress}`);
  console.log(`Owner: ${deployerAddress}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  try {
    // Verify the contract
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [
        "Partiture Music Sheets", // name
        "MUSIC", // symbol
        deployerAddress // initial owner
      ],
    });

    console.log("✅ Contract verified successfully!");
    
    // Provide explorer links based on network
    const explorerUrls = {
      base: "https://basescan.org",
      baseSepolia: "https://sepolia.basescan.org",
    };

    const explorerUrl = explorerUrls[hre.network.name];
    if (explorerUrl) {
      console.log(`🔗 View on explorer: ${explorerUrl}/address/${contractAddress}`);
    }

  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("ℹ️  Contract is already verified!");
    } else {
      console.error("❌ Verification failed:");
      console.error(error.message);
      process.exit(1);
    }
  }
}

main()
  .then(() => {
    console.log("\n🎉 Verification process completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Verification process failed:");
    console.error(error);
    process.exit(1);
  });