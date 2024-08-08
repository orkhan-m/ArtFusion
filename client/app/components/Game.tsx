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

interface Card {
  id: string;
  content: string;
}

const initialCards = [
  { id: "card-1", content: "Card 1" },
  { id: "card-2", content: "Card 2" },
  { id: "card-3", content: "Card 3" },
];

export const Game: React.FC = () => {
  console.log("rendered");
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [droppedCards, setDroppedCards] = useState<Card[]>([]);
  // const user = useUser();

  const [wallet, setWalletAddress] = useState<string>(DEFAULT_ETH_ADDRESS);
  const [collection, setCollectionAddress] = useState<string>(
    DEFAULT_CONTRACT_ADDRESS
  );
  const [NFTs, setNFTs] = useState<any>([]);

  const handleDragEnd = (result: DropResult) => {
    console.log(result);
    if (!result.destination) return;

    if (
      result.source.droppableId === "cards" &&
      result.destination.droppableId === "dropArea"
    ) {
      const newCards = Array.from(cards);
      const [removed] = newCards.splice(result.source.index, 1);
      setCards(newCards);

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

      const newCards = Array.from(cards);
      newCards.splice(result.destination.index, 0, removed);
      setCards(newCards);
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
      const newCards = Array.from(cards);
      const [removed] = newCards.splice(result.source.index, 1);
      newCards.splice(result.destination.index, 0, removed);
      setCards(newCards);
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

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    if (nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);
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

  return (
    <div>
      <div className="address-wrapper">
        <div className="form-group">
          <label>Your wallet address:</label>
          <input
            type="text"
            value={wallet}
            readOnly
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Collection address:</label>
          <input
            type="text"
            value={collection}
            readOnly
            className="form-control"
          ></input>
        </div>
      </div>

      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {NFTs.length &&
          NFTs.map((nft: any) => {
            return <NFTCard key={nft.id.tokenId} nft={nft}></NFTCard>;
          })}
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
                {cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="card"
                      >
                        {card.content}
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
                {droppedCards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="card"
                      >
                        {card.content}
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
