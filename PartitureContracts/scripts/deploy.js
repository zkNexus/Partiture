const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting Partiture contract deployment...");

  // Get the contract factory
  const PartitureNFT = await hre.ethers.getContractFactory("PartitureNFT");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);

  // Check balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy the contract
  console.log("🔨 Deploying PartitureNFT...");
  const partitureNFT = await PartitureNFT.deploy(
    "Partiture Music Sheets", // name
    "MUSIC", // symbol
    deployer.address // initial owner
  );

  await partitureNFT.waitForDeployment();
  const contractAddress = await partitureNFT.getAddress();

  console.log("✅ PartitureNFT deployed to:", contractAddress);

  // Save deployment info
  const networkName = hre.network.name;
  const deploymentInfo = {
    network: networkName,
    chainId: hre.network.config.chainId,
    contractAddress: contractAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await deployer.provider.getBlockNumber(),
  };

  console.log("\n📋 Deployment Summary:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Network: ${deploymentInfo.network}`);
  console.log(`Chain ID: ${deploymentInfo.chainId}`);
  console.log(`Contract: ${deploymentInfo.contractAddress}`);
  console.log(`Deployer: ${deploymentInfo.deployer}`);
  console.log(`Block: ${deploymentInfo.blockNumber}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // If on live network, provide verification instructions
  if (networkName !== "hardhat" && networkName !== "localhost") {
    console.log("\n🔍 To verify the contract, run:");
    console.log(`npx hardhat verify --network ${networkName} ${contractAddress} "Partiture Music Sheets" "MUSIC" "${deployer.address}"`);
  }

  return deploymentInfo;
}

// Execute deployment
main()
  .then((result) => {
    console.log("\n🎉 Deployment completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });