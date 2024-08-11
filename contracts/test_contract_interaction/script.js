const contractAddress = "0x87b20835950639a72cb4f81d8a7e8a0a75995321"; // Replace with your deployed contract address
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ERC721EnumerableForbiddenBatchMint",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "ERC721OutOfBoundsIndex",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "string",
        name: "newTokenUri",
        type: "string",
      },
    ],
    name: "burnAndMintNew",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenUri",
        type: "string",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "mintNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "usersNFTs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let web3;
let contract;

const checkMetaMask = document.getElementById("checkMetaMask");

checkMetaMask.addEventListener("click", () => {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask installed");
  } else {
    window.open("https://metamask.io/download/", "_blank");
  }
});

document.getElementById("connectButton").addEventListener("click", async () => {
  if (
    typeof window.ethereum !== "undefined" ||
    typeof window.web3 !== "undefined"
  ) {
    // MetaMask is installed
    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Accounts now exposed
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      document.getElementById(
        "accountInfo"
      ).innerText = `Connected: ${account}`;

      contract = new web3.eth.Contract(contractABI, contractAddress);

      // Fetch and display NFTs
      displayNFTs(account);
    } catch (error) {
      console.error("User denied account access or another error occurred");
    }
  } else {
    // MetaMask is not installed
    alert("MetaMask is not installed!");
  }
});

async function displayNFTs(account) {
  const balance = await contract.methods.balanceOf(account).call();
  const nftList = document.getElementById("nftList");
  nftList.innerHTML = "";

  for (let i = 0; i < balance; i++) {
    const tokenId = await contract.methods
      .tokenOfOwnerByIndex(account, i)
      .call();
    const tokenURI = await contract.methods.tokenURI(tokenId).call();

    // Convert IPFS URI to a HTTP URL for the JSON metadata
    const ipfsGatewayUrl = `https://ipfs.io/ipfs/${
      tokenURI.split("ipfs://")[1]
    }`;

    try {
      // Fetch the JSON metadata from IPFS
      const response = await fetch(ipfsGatewayUrl);
      const metadata = await response.json();

      // Extract the image URL from the metadata
      const imageUrl =
        metadata.image || "https://via.placeholder.com/200?text=No+Image";

      // Create a new div for each NFT
      const nftItem = document.createElement("div");
      nftItem.className = "nft-item";

      // Create an image element
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.alt = metadata.name || `Token ID: ${tokenId}`;
      imgElement.style.maxWidth = "200px"; // Set max width for the image

      // Add the image to the nftItem div
      nftItem.appendChild(imgElement);

      // Create a paragraph for the token ID and URI
      const infoElement = document.createElement("p");
      infoElement.innerText = `Token ID: ${tokenId} - Name: ${
        metadata.name || "Unknown"
      }`;

      // Add the info text to the nftItem div
      nftItem.appendChild(infoElement);

      // Add the nftItem div to the nftList
      nftList.appendChild(nftItem);
    } catch (error) {
      console.error("Error fetching NFT metadata:", error);

      // Display the token ID even if metadata fetching fails
      const nftItem = document.createElement("div");
      nftItem.className = "nft-item";

      const infoElement = document.createElement("p");
      infoElement.innerText = `Token ID: ${tokenId} - Failed to load metadata`;

      nftItem.appendChild(infoElement);
      nftList.appendChild(nftItem);
    }
  }
}

// Add event listener for minting NFTs
document.getElementById("mintButton").addEventListener("click", async () => {
  const tokenUriInput = document.getElementById("tokenUriInput").value;
  const recipientInput = document.getElementById("recipientInput").value; // Get recipient address from input

  if (!tokenUriInput || !web3.utils.isAddress(recipientInput)) {
    alert("Please enter a valid token URI and recipient address");
    return;
  }

  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    // Call the mintNFT function from the smart contract with tokenUri and recipient address
    await contract.methods
      .mintNFT(tokenUriInput, recipientInput)
      .send({ from: account });

    alert("NFT Minted Successfully!");

    // Refresh the displayed NFTs
    displayNFTs(recipientInput); // Optionally display NFTs for the recipient
  } catch (error) {
    console.error("Error minting NFT:", error);
    alert("Error minting NFT. Check the console for details.");
  }
});

// Add event listener for burning two NFTs and minting a new one
document
  .getElementById("burnAndMintButton")
  .addEventListener("click", async () => {
    const burnTokenId1 = document.getElementById("burnTokenId1").value;
    const burnTokenId2 = document.getElementById("burnTokenId2").value;
    const newTokenUri = document.getElementById("newTokenUriInput").value;

    if (!burnTokenId1 || !burnTokenId2 || !newTokenUri) {
      alert("Please enter two valid token IDs and a new token URI");
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      // Call the burnAndMintNew function from the smart contract
      await contract.methods
        .burnAndMintNew([burnTokenId1, burnTokenId2], newTokenUri)
        .send({ from: account });

      alert("Two NFTs burned and a new one minted successfully!");

      // Refresh the displayed NFTs
      displayNFTs(account);
    } catch (error) {
      console.error("Error burning NFTs and minting new one:", error);
    }
  });
