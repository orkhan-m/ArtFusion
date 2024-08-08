export interface NFT {
  contract: {
    address: string;
  };
  id: {
    tokenId: string;
    tokenMetadata: {
      tokenType: string;
    };
  };
  balance: string;
  title: string;
  description: string;
  tokenUri: {
    gateway: string;
    raw: string;
  };
  media: Array<{
    gateway: string;
    thumbnail: string;
    raw: string;
    format: string;
    bytes: number;
  }>;
  metadata: {
    name: string;
    description: string;
    image: string;
    properties: {
      name: string;
      number: number;
    };
  };
  timeLastUpdated: string;
  contractMetadata: {
    name: string;
    symbol: string;
    totalSupply: string;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSea: {
      floorPrice: number;
      collectionName: string;
      collectionSlug: string;
      safelistRequestStatus: string;
      imageUrl: string;
      description: string;
      lastIngestedAt: string;
    };
  };
}
