// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title PartitureNFT
 * @dev NFT contract for Partiture music sheets with metadata and royalties
 */
contract PartitureNFT is 
    ERC721,
    ERC721URIStorage,
    ERC721Enumerable,
    Ownable,
    ReentrancyGuard,
    Pausable
{
    using Strings for uint256;

    struct SheetMetadata {
        string title;
        string composer;
        string genre;
        uint256 createdAt;
        bool isPublic;
        address creator;
    }

    // Mapping from token ID to sheet metadata
    mapping(uint256 => SheetMetadata) private _sheetMetadata;
    
    // Mapping from creator to their created tokens
    mapping(address => uint256[]) private _creatorTokens;
    
    // Current token ID counter
    uint256 private _tokenIdCounter;
    
    // Royalty percentage (in basis points, e.g., 500 = 5%)
    uint256 private _royaltyPercentage = 500; // 5%
    
    // Platform fee percentage (in basis points)
    uint256 private _platformFee = 250; // 2.5%
    
    // Events
    event SheetMinted(
        uint256 indexed tokenId,
        address indexed creator,
        string title,
        string tokenURI
    );
    
    event SheetUpdated(
        uint256 indexed tokenId,
        string title,
        bool isPublic
    );

    constructor(
        string memory name,
        string memory symbol,
        address initialOwner
    ) ERC721(name, symbol) Ownable(initialOwner) {
        _tokenIdCounter = 1; // Start from 1
    }

    /**
     * @dev Mint a new music sheet NFT
     * @param to Address to mint the NFT to
     * @param title Title of the music sheet
     * @param composer Composer name
     * @param genre Music genre
     * @param tokenURI Metadata URI for the NFT
     * @param isPublic Whether the sheet is publicly visible
     */
    function mintSheet(
        address to,
        string memory title,
        string memory composer,
        string memory genre,
        string memory tokenURI,
        bool isPublic
    ) public whenNotPaused returns (uint256) {
        uint256 tokenId = _tokenIdCounter++;
        
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        _sheetMetadata[tokenId] = SheetMetadata({
            title: title,
            composer: composer,
            genre: genre,
            createdAt: block.timestamp,
            isPublic: isPublic,
            creator: to
        });
        
        _creatorTokens[to].push(tokenId);
        
        emit SheetMinted(tokenId, to, title, tokenURI);
        
        return tokenId;
    }

    /**
     * @dev Update sheet metadata (only by owner of the token)
     * @param tokenId Token ID to update
     * @param title New title
     * @param isPublic New visibility setting
     */
    function updateSheet(
        uint256 tokenId,
        string memory title,
        bool isPublic
    ) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(_exists(tokenId), "Token does not exist");
        
        _sheetMetadata[tokenId].title = title;
        _sheetMetadata[tokenId].isPublic = isPublic;
        
        emit SheetUpdated(tokenId, title, isPublic);
    }

    /**
     * @dev Get sheet metadata
     * @param tokenId Token ID to query
     */
    function getSheetMetadata(uint256 tokenId) public view returns (SheetMetadata memory) {
        require(_exists(tokenId), "Token does not exist");
        return _sheetMetadata[tokenId];
    }

    /**
     * @dev Get all tokens created by an address
     * @param creator Creator address
     */
    function getCreatorTokens(address creator) public view returns (uint256[] memory) {
        return _creatorTokens[creator];
    }

    /**
     * @dev Get all public sheets (paginated)
     * @param offset Starting index
     * @param limit Maximum number of results
     */
    function getPublicSheets(uint256 offset, uint256 limit) 
        public 
        view 
        returns (uint256[] memory, SheetMetadata[] memory) 
    {
        uint256 total = totalSupply();
        require(offset < total, "Offset exceeds total supply");
        
        uint256 end = offset + limit > total ? total : offset + limit;
        uint256 publicCount = 0;
        
        // First pass: count public sheets in range
        for (uint256 i = offset; i < end; i++) {
            uint256 tokenId = tokenByIndex(i);
            if (_sheetMetadata[tokenId].isPublic) {
                publicCount++;
            }
        }
        
        // Second pass: collect public sheets
        uint256[] memory tokenIds = new uint256[](publicCount);
        SheetMetadata[] memory metadata = new SheetMetadata[](publicCount);
        uint256 currentIndex = 0;
        
        for (uint256 i = offset; i < end; i++) {
            uint256 tokenId = tokenByIndex(i);
            if (_sheetMetadata[tokenId].isPublic) {
                tokenIds[currentIndex] = tokenId;
                metadata[currentIndex] = _sheetMetadata[tokenId];
                currentIndex++;
            }
        }
        
        return (tokenIds, metadata);
    }

    /**
     * @dev Get current token ID counter
     */
    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter - 1; // Subtract 1 since counter is incremented after minting
    }

    /**
     * @dev Set royalty percentage (only owner)
     * @param percentage Royalty percentage in basis points
     */
    function setRoyaltyPercentage(uint256 percentage) public onlyOwner {
        require(percentage <= 1000, "Royalty too high"); // Max 10%
        _royaltyPercentage = percentage;
    }

    /**
     * @dev Set platform fee (only owner)
     * @param fee Platform fee in basis points
     */
    function setPlatformFee(uint256 fee) public onlyOwner {
        require(fee <= 1000, "Platform fee too high"); // Max 10%
        _platformFee = fee;
    }

    /**
     * @dev Pause contract (only owner)
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause contract (only owner)
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Withdraw accumulated fees (only owner)
     */
    function withdraw() public onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    // Override functions for multiple inheritance
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    /**
     * @dev Check if token exists
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        return tokenId > 0 && tokenId < _tokenIdCounter;
    }
}