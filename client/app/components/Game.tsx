"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { DEFAULT_CONTRACT_ADDRESS } from "../consts";
import { NFTCard } from "./NFTCard";
import { useUser } from "@account-kit/react";
import { CreateNFTModal } from "./CreateNFTModal";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { NFTBaseData, GENERATE_IMAGE_MOCK_INPUT } from "../../../common";
import { alchemyNftClient } from "@/config";
import { OwnedNft } from "alchemy-sdk";

export const Game: React.FC = () => {
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  const [droppedCards, setDroppedCards] = useState<OwnedNft[]>([]);
  const user = useUser();

  const [wallet, setWalletAddress] = useState<string>("");
  const [collection, setCollectionAddress] = useState<string>("");
  const [isCreateNFTModalOpen, setIsCreateNFTModalOpen] = useState(false);

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
    const response = await alchemyNftClient.nft.getNftsForOwner(wallet, {
      contractAddresses: [DEFAULT_CONTRACT_ADDRESS],
    });
    setNfts(response.ownedNfts);
  };

  useEffect(() => {
    setWalletAddress(user?.address!);
    setCollectionAddress(DEFAULT_CONTRACT_ADDRESS);
  }, [user?.address]);

  useEffect(() => {
    if (wallet && collection) {
      fetchNFTs();
    }
  }, [wallet, collection]);

  const openModal = () => {
    setIsCreateNFTModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateNFTModalOpen(false);
  };

  const sendNFTData = async () => {
    const data: NFTBaseData[] = droppedCards.map((i) => ({
      name: i.name!,
      description: i.description!,
    }));
    return axios
      .post<
        NFTBaseData[],
        AxiosResponse<any>
      >("http://localhost:4000/createNFT", GENERATE_IMAGE_MOCK_INPUT)
      .then((response) => response.data);
  };

  const {
    isPending: isGenerateImageLoading,
    mutate: generateImage,
    data: generateImageData,
  } = useMutation({
    mutationFn: () => {
      return sendNFTData();
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={openModal}
                >
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
                        key={nft.tokenId}
                        draggableId={nft.tokenId}
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    generateImage();
                  }}
                >
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
                        key={nft.tokenId}
                        draggableId={nft.tokenId}
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
      <CreateNFTModal isOpen={isCreateNFTModalOpen} onClose={closeModal} />
    </div>
  );
};
