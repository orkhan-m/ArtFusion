"use client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { DEFAULT_CONTRACT_ADDRESS, DEFAULT_ETH_ADDRESS } from "../consts";
import { NFTCard } from "./NFTCard";
import { NFT } from "../models";
import { useUser } from "@account-kit/react";
import { ImageUpload } from "./ImageUpload";

export const Game: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [droppedCards, setDroppedCards] = useState<NFT[]>([]);
  const user = useUser();

  const [wallet, setWalletAddress] = useState<string>("");
  const [collection, setCollectionAddress] = useState<string>("");

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (
      result.source.droppableId === "cards" &&
      result.destination.droppableId === "dropArea"
    ) {
      const newCards = Array.from(nfts);
      const [removed] = newCards.splice(result.source.index, 1);
      setNfts(newCards);

      const newDroppedCards = Array.from(droppedCards);
      newDroppedCards.splice(result.destination.index, 0, removed);
      setDroppedCards(newDroppedCards);
    } else if (
      result.source.droppableId === "dropArea" &&
      result.destination.droppableId === "cards"
    ) {
      const newDroppedCards = Array.from(droppedCards);
      const [removed] = newDroppedCards.splice(result.source.index, 1);
      setDroppedCards(newDroppedCards);

      const newCards = Array.from(nfts);
      newCards.splice(result.destination.index, 0, removed);
      setNfts(newCards);
    } else if (
      result.source.droppableId === "dropArea" &&
      result.destination.droppableId === "dropArea"
    ) {
      const newDroppedCards = Array.from(droppedCards);
      const [removed] = newDroppedCards.splice(result.source.index, 1);
      newDroppedCards.splice(result.destination.index, 0, removed);
      setDroppedCards(newDroppedCards);
    } else if (
      result.source.droppableId === "cards" &&
      result.destination.droppableId === "cards"
    ) {
      const newCards = Array.from(nfts);
      const [removed] = newCards.splice(result.source.index, 1);
      newCards.splice(result.destination.index, 0, removed);
      setNfts(newCards);
    }
  };

  const fetchNFTs = async () => {
    let nfts: NFT[] = [];
    const api_key = "tFRus-ejJq6yuZyv0jLCrrn2y5eCLsyK";
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: "GET",
    };

    const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
    try {
      nfts = await fetch(fetchURL, requestOptions)
        .then((data) => data.json())
        .then((data) => data.ownedNfts);
    } catch {}

    if (nfts) {
      setNfts(nfts as NFT[]);
    }
  };

  useEffect(() => {
    setWalletAddress(DEFAULT_ETH_ADDRESS);
    setCollectionAddress(DEFAULT_CONTRACT_ADDRESS);
  }, [user?.address]);

  useEffect(() => {
    if (wallet && collection) {
      fetchNFTs();
    }
  }, [wallet, collection]);

  return (
    <div>
      <div className="address-wrapper">
        <div>
          <label>Your wallet address:</label>
          <input type="text" value={wallet} readOnly></input>
        </div>
        <div>
          <label>Collection address:</label>
          <input type="text" value={collection} readOnly></input>
        </div>
      </div>
      <div className="mt-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="dnd-wrapper">
            <div className="dnd-item">
              <div className="dnd-item-header">
                <h5>Your Collection</h5>
                <button type="button" className="btn btn-primary">
                  Create new NFT
                </button>
              </div>

              <Droppable droppableId="cards" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="card-list"
                  >
                    {nfts.map((nft, index) => (
                      <Draggable
                        key={nft.id.tokenId}
                        draggableId={nft.id.tokenId}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <NFTCard nft={nft}></NFTCard>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            <div className="dnd-item">
              <div className="dnd-item-header">
                <h5>Mixer area (drop here your nfts to combine them)</h5>
                <button type="button" className="btn btn-primary">
                  Shake them!
                </button>
              </div>

              <Droppable droppableId="dropArea" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="drop-area"
                  >
                    {droppedCards.map((nft, index) => (
                      <Draggable
                        key={nft.id.tokenId}
                        draggableId={nft.id.tokenId}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <NFTCard nft={nft}></NFTCard>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
      <div>
        <ImageUpload />
      </div>
    </div>
  );
};
