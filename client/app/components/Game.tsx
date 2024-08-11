"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { BACKEND_URL, CONTRACT_ABI, DEFAULT_CONTRACT_ADDRESS } from "../consts";
import { NFTCard } from "./NFTCard";
import { CreateNFTMetadataResponse, CreateNFTModal } from "./CreateNFTModal";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { OwnedNft } from "alchemy-sdk";
import { alchemyClient } from "@/config";
import { NFTBaseData } from "../models";
import {
  useSendUserOperation,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import classNames from "classnames";
import { encodeFunctionData, Hex } from "viem";
import { enqueueSnackbar } from "notistack";

export const Game: React.FC = () => {
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  const [isNftsLoading, setIsNftsLoading] = useState<boolean>(false);
  const [droppedCards, setDroppedCards] = useState<OwnedNft[]>([]);
  // NOTE: initialize smart account client
  const { client } = useSmartAccountClient({ type: "LightAccount" });
  const {
    sendUserOperation,
    sendUserOperationResult,
    isSendingUserOperation,
    error: isSendUserOperationError,
  } = useSendUserOperation({ client, waitForTxn: true });
  const user = useUser();

  const [wallet, setWalletAddress] = useState<string>("");
  const [collection, setCollectionAddress] = useState<string>("");
  const [isCreateNFTModalOpen, setIsCreateNFTModalOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

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
    setIsNftsLoading(true);
    const response = await alchemyClient.nft.getNftsForOwner(user?.address!, {
      contractAddresses: [DEFAULT_CONTRACT_ADDRESS],
    });
    setIsNftsLoading(false);

    setNfts(response.ownedNfts);
  };

  useEffect(() => {
    // NOTE: user's address is correct
    setWalletAddress(user?.address!);
    // NOTE: contract address is correct
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

  const shakeNFTsRequest = async (data: NFTBaseData[]) => {
    setIsShaking(true);
    return axios
      .post<NFTBaseData[], AxiosResponse<CreateNFTMetadataResponse>>(
        BACKEND_URL + "/shakeNFTs",
        data
      )
      .then((response) => response.data);
  };

  const burnAndMintNew = async (tokenUri: string) => {
    const tokenIds = droppedCards.map((i) => i.tokenId);
    console.log(tokenIds);
    const uoCallData = encodeFunctionData({
      abi: CONTRACT_ABI,
      functionName: "burnAndMintNew",
      args: [tokenIds, tokenUri, user?.address],
    });
    sendUserOperation({
      uo: {
        target: DEFAULT_CONTRACT_ADDRESS as Hex,
        data: uoCallData,
      },
    });
  };

  const { isPending: isShakeNFTsLoading, mutate: shakeNFTs } = useMutation({
    mutationFn: (data: NFTBaseData[]) => {
      return shakeNFTsRequest(data);
    },
    onSuccess: (data) => {
      burnAndMintNew(data.IpfsHash);
    },
  });

  useEffect(() => {
    if (sendUserOperationResult || isSendUserOperationError) {
      setIsShaking(false);
      enqueueSnackbar(
        "NFT has been created! You'll be able to see it in a seconds..."
      );
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  }, [sendUserOperationResult, isSendUserOperationError]);

  return (
    <div>
      <div className="address-wrapper">
        <div className="address">
          <div>Your wallet address:</div>
          <div>{wallet}</div>
        </div>
        <div className="address">
          <div>Collection address:</div>
          <div>{collection}</div>
        </div>
      </div>
      <div className="mt-3">
        <div>Create new NFTs or combine existing ones using Web3-AI mixer</div>
        <div>We support mixing of two NFTs for the moment</div>
      </div>
      {isNftsLoading ? (
        <div className="mt-6">NFTs loading...</div>
      ) : (
        <div className="mt-6">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="dnd-wrapper">
              <div className="dnd-item">
                <div className="dnd-item-header">
                  <h5>Your Collection</h5>
                  <button className="btn btn-primary" onClick={openModal}>
                    Create new NFT
                  </button>
                  {isShaking && <div>We are combining your NFTs!</div>}
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
                    className="btn btn-primary"
                    onClick={() => {
                      const data: NFTBaseData[] = droppedCards.map((i) => ({
                        name: i.name!,
                      }));
                      shakeNFTs(data);
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
                      className={classNames("drop-area", { shake: isShaking })}
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
      )}

      {isCreateNFTModalOpen && (
        <CreateNFTModal
          isOpen={isCreateNFTModalOpen}
          onClose={closeModal}
          refetchNfts={fetchNFTs}
        />
      )}
    </div>
  );
};
