"use client";

interface IProps {
  nft: any;
}

export const NFTCard: React.FC<IProps> = ({ nft }) => {
  return (
    <div className="nft-card">
      <img src={nft.media[0].gateway} />
      <div>
        <h5>{nft.title}</h5>
        <p>{nft.description}</p>
      </div>
    </div>
  );
};
