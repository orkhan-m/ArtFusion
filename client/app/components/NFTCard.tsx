"use client";

import { NFT } from "../models";

interface IProps {
  nft: NFT;
}

export const NFTCard: React.FC<IProps> = ({ nft }) => {
  return (
    <div className="nft-card">
      <img src={nft.media[0].gateway} className="nft-card-image" />
      <h5 className="nft-card-title">{nft.title}</h5>
      <div>
        <div className="nft-card-description">{nft.description}</div>
      </div>
    </div>
  );
};
