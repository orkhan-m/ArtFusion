import { OwnedNft } from "alchemy-sdk";

interface IProps {
  nft: OwnedNft;
}

export const NFTCard: React.FC<IProps> = ({ nft }) => {
  return (
    <div className="nft-card">
      <img
        src={nft.raw.metadata.image}
        className="nft-card-image"
        alt={nft.raw.metadata.image}
      />
      <h5 className="nft-card-title">{nft.name}</h5>
      <div>
        <div className="nft-card-description">{nft.description}</div>
      </div>
    </div>
  );
};
