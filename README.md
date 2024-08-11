# ArtFusion
## AI-Powered NFT Creation App

## Overview

This application allows users to create, manage, and merge NFTs using AI, all without requiring any prior experience in cryptocurrency or Web3. Users can log in with their email, upload images, and generate unique NFTs. Additionally, users can combine two NFTs to create a completely new one. The application is built with accessibility and simplicity in mind, making NFT creation available to everyone.

## Features

- **User-Friendly Login:** Easily log in using your email with the help of Alchemy Account Kit. No need for crypto wallets or understanding blockchain technology.
- **AI-Powered NFT Creation:** Upload any image, and our AI will generate a unique NFT based on the image's description.
- **NFT Merging:** Combine two NFTs into a new one, using AI to blend elements from both.
- **Decentralized Storage with IPFS:** All NFT images are securely stored using IPFS, ensuring data integrity and decentralized access.
- **Multi-Network Support:** Smart contracts are deployed on multiple networks, providing flexibility and reach.

## Technology Stack

### Frontend

- **React:** User interface development.
- **Alchemy Account Kit:** Simplifies user authentication without requiring crypto knowledge.

### Backend

- **Node.js:** Handles API requests and business logic.
- **Express.js:** Manages server-side routing.
- **IPFS:** Used for decentralized storage of NFT images.
- **AI Image Processing:** Integrates AI for image identification and NFT generation.

### Smart Contracts

- **Solidity:** Smart contracts deployed on multiple Ethereum-based networks.
- **Networks Supported:**
  - Ethereum Sepolia: `0x491b61d349b9ad4b2b1ac398b9280a079b97192a`
  - Optimism Sepolia: `0x155bc4207709a0a7bfbddd47c260b3f40afd464c`
  - Base Sepolia: `0x2cdd0e57d3609dc93047794409ab2f9aaafa4e4d`

## How It Works

1. **Login:** Users log in with their email using Alchemy Account Kit.
2. **Create an NFT:** Upload an image. The AI processes the image, generates a description, and creates an NFT. Two NFTs used as a source for new one are burned.
3. **Merge NFTs:** Select two NFTs to combine. The AI merges them to create a new, unique NFT.
4. **Storage:** The newly created or merged NFT image is stored on IPFS, ensuring decentralized, secure, and reliable access.

## Installation
