# Partiture Contracts

Smart contracts for the Partiture music sheet NFT platform deployed on Base network.

## Overview

This package contains the smart contracts for Partiture, a platform for creating, sharing, and trading music sheet NFTs. The contracts are built with Solidity and deployed using Hardhat.

## Features

- **PartitureNFT**: ERC-721 NFT contract for music sheets with metadata
- **Royalty System**: Built-in royalty mechanism for creators
- **Privacy Controls**: Public/private/unlisted sheet visibility
- **Metadata Storage**: On-chain sheet information (title, composer, genre)
- **Creator Management**: Track sheets by creator address
- **Enumerable**: Support for listing and pagination

## Prerequisites

- Node.js 18+ (Note: Hardhat v3 requires Node.js 22+ for full compatibility)
- npm or yarn
- Base network RPC access
- BaseScan API key (for verification)

## Installation

1. Clone and navigate to the contracts directory:
```bash
cd PartitureContracts
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment template:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASE_RPC_URL=https://mainnet.base.org
PRIVATE_KEY=your_private_key_here
BASESCAN_API_KEY=your_basescan_api_key_here
```

## Usage

### Compilation

Compile the contracts:
```bash
npm run compile
```

### Testing

Run tests:
```bash
npm run test
```

### Deployment

Deploy to Base Sepolia (testnet):
```bash
npm run deploy:sepolia
```

Deploy to Base Mainnet:
```bash
npm run deploy:mainnet
```

### Verification

Verify contract on Base Sepolia:
```bash
npm run verify:sepolia <CONTRACT_ADDRESS>
```

Verify contract on Base Mainnet:
```bash
npm run verify:mainnet <CONTRACT_ADDRESS>
```

### Contract Interaction

The interaction script provides a CLI interface for common contract operations:

```bash
# Get contract information
npm run interact:sepolia <CONTRACT_ADDRESS> info

# Mint a new sheet
npm run interact:sepolia <CONTRACT_ADDRESS> mint <to_address> "Song Title" "Composer Name"

# Get sheets by creator
npm run interact:sepolia <CONTRACT_ADDRESS> sheets <creator_address>

# Get sheet metadata
npm run interact:sepolia <CONTRACT_ADDRESS> metadata <token_id>

# Get public sheets (paginated)
npm run interact:sepolia <CONTRACT_ADDRESS> public <offset> <limit>
```

## Contract Architecture

### PartitureNFT.sol

The main NFT contract that combines several OpenZeppelin contracts:

- **ERC721**: Base NFT functionality
- **ERC721URIStorage**: Metadata URI storage
- **ERC721Enumerable**: Token enumeration and pagination
- **Ownable**: Access control for admin functions
- **ReentrancyGuard**: Protection against reentrancy attacks
- **Pausable**: Emergency pause functionality

### Key Features

**Sheet Metadata Structure:**
```solidity
struct SheetMetadata {
    string title;
    string composer;
    string genre;
    uint256 createdAt;
    bool isPublic;
    address creator;
}
```

**Main Functions:**
- `mintSheet()`: Create new music sheet NFTs
- `updateSheet()`: Update sheet metadata (owner only)
- `getSheetMetadata()`: Retrieve sheet information
- `getCreatorTokens()`: Get all tokens by a creator
- `getPublicSheets()`: Paginated public sheet listing

## Networks

### Base Sepolia (Testnet)
- **Chain ID**: 84532
- **RPC URL**: https://sepolia.base.org
- **Explorer**: https://sepolia.basescan.org
- **Faucet**: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

### Base Mainnet
- **Chain ID**: 8453
- **RPC URL**: https://mainnet.base.org
- **Explorer**: https://basescan.org

## Security

- All contracts use OpenZeppelin battle-tested implementations
- ReentrancyGuard protects against reentrancy attacks
- Pausable functionality for emergency stops
- Access control with Ownable pattern
- Input validation on all public functions

## Gas Optimization

- Optimized with 200 runs for balanced deployment/execution costs
- Efficient storage patterns for metadata
- Batch operations where possible
- Minimal proxy patterns for future upgrades (if needed)

## License

MIT License - see LICENSE file for details.

## Support

For technical support and questions:
- GitHub Issues: [Create an issue](https://github.com/zkNexus/Partiture)
- Email: support@partiture.xyz

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## Deployment History

Track your deployments in this section:

```
Base Sepolia:
- PartitureNFT: [Contract Address]
- Deployer: [Deployer Address]
- Date: [Deployment Date]

Base Mainnet:
- PartitureNFT: [Contract Address]
- Deployer: [Deployer Address] 
- Date: [Deployment Date]
```