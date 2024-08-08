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

export const Game: React.FC = () => {
  console.log("rendered");
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [droppedCards, setDroppedCards] = useState<NFT[]>([]);
  // const user = useUser();

  const [wallet, setWalletAddress] = useState<string>(DEFAULT_ETH_ADDRESS);
  const [collection, setCollectionAddress] = useState<string>(
    DEFAULT_CONTRACT_ADDRESS
  );

  const handleDragEnd = (result: DropResult) => {
    console.log(result);
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
    let nfts;
    console.log("fetching nfts");
    const api_key = "tFRus-ejJq6yuZyv0jLCrrn2y5eCLsyK";
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: "GET",
    };

    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;

      try {
        nfts = await fetch(fetchURL, requestOptions).then((data) =>
          data.json()
        );
      } catch {}
    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      try {
        nfts = await fetch(fetchURL, requestOptions).then((data) =>
          data.json()
        );
        console.log(nfts);
      } catch {}
    }

    if (nfts) {
      console.log("nfts:", nfts);
      setNfts(nfts.ownedNfts as NFT[]);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  // useEffect(() => {
  //   if (user?.address) {
  //     setWalletAddress(user?.address);
  //   }
  // }, [user?.address]);

  console.log(nfts);

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
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="App">
          <h2>Available Cards</h2>
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
                        className="card"
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

          <h2>Drop Area</h2>
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
                        className="card"
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
      </DragDropContext>
    </div>
  );
};
