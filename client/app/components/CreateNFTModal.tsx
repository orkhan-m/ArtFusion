"use client";

import Modal from "react-modal";
import ImageUploading, { ImageType } from "react-images-uploading";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import TypingEffect from "../utils";
import { ChatCompletion } from "../models";
import { encodeFunctionData, Hex } from "viem";
import { CONTRACT_ABI, DEFAULT_CONTRACT_ADDRESS } from "../consts";
import {
  useSendUserOperation,
  useSmartAccountClient,
  useUser,
} from "@account-kit/react";
import { enqueueSnackbar } from "notistack";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export interface CreateNFTMetadataRequest {
  name: string;
  description: string;
  imageUrl: string;
}

export interface CreateNFTMetadataResponse {
  IpfsHash: string;
}

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  refetchNfts: () => void;
}

export const CreateNFTModal: React.FC<IProps> = ({
  isOpen,
  onClose,
  refetchNfts,
}) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const user = useUser();
  const { client } = useSmartAccountClient({ type: "LightAccount" });
  const {
    sendUserOperation,
    sendUserOperationResult,
    isSendingUserOperation,
    error: isSendUserOperationError,
  } = useSendUserOperation({ client, waitForTxn: true });
  const [aiResponse, setAiResponse] = useState<ChatCompletion | null>(null);

  const maxNumber = 1;
  const onChange = (images: any) => {
    setImages(images);
  };

  const submit = () => {
    analyzeImage(images[0]);
  };

  const sendImage = async (file: ImageType) => {
    return axios
      .post<ImageType, AxiosResponse<ChatCompletion>>(
        "http://localhost:4000/chat-gpt/analyzeImage",
        {
          data_url: file.data_url,
        }
      )
      .then((response) => response.data);
  };

  const createNFTMetadataRequest = async (data: CreateNFTMetadataRequest) => {
    return axios
      .post<CreateNFTMetadataRequest, AxiosResponse<CreateNFTMetadataResponse>>(
        "http://localhost:4000/createNFTMetadata",
        data
      )
      .then((response) => response.data);
  };

  const { isPending: isCreateNFTMetadataLoading, mutate: createNFTMetadata } =
    useMutation({
      mutationFn: (data: CreateNFTMetadataRequest) => {
        return createNFTMetadataRequest(data);
      },
      onSuccess: (data) => {
        createNFT(data);
      },
    });

  const { isPending: isAnalyzeImageLoading, mutate: analyzeImage } =
    useMutation({
      mutationFn: (file: ImageType) => {
        return sendImage(file);
      },
      onSuccess: (data) => {
        setAiResponse(data);
      },
    });

  const createNFT = async (data: CreateNFTMetadataResponse) => {
    const uoCallData = encodeFunctionData({
      abi: CONTRACT_ABI,
      functionName: "mintNFT",
      args: [data.IpfsHash, user?.address],
    });
    sendUserOperation({
      uo: {
        target: DEFAULT_CONTRACT_ADDRESS as Hex,
        data: uoCallData,
      },
    });
  };

  const closeModal = () => {
    setImages([]);
    setAiResponse(null);
    onClose();
  };

  const handleCreateNFTMetadata = () => {
    if (aiResponse) {
      const fields = aiResponse.choices[0].message.content
        .split(".")
        .map((i) => i.trim());
      const data: CreateNFTMetadataRequest = {
        name: fields[0],
        description: fields[1],
        imageUrl: images[0].data_url,
      };
      createNFTMetadata(data);
    }
  };

  useEffect(() => {
    if (sendUserOperationResult) {
      enqueueSnackbar("NFT has been created!");
      refetchNfts();
      onClose();
    }
  }, [sendUserOperationResult]);

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div className="modal-header">
        <h2>Create NFT!</h2>
      </div>

      <div className="modal-body">
        <div className="image-upload-wrapper mt-3">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg", "png", "jpeg", "webp"]}
          >
            {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  className="btn btn-primary"
                  onClick={onImageUpload}
                  {...dragProps}
                  disabled={!!images.length}
                >
                  Click for file upload
                </button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={image.data_url}
                      className="image-item-photo"
                      alt={image.dataURL}
                    />
                    <div className="image-item__btn-wrapper">
                      <button
                        onClick={() => {
                          setAiResponse(null);
                          onImageRemove(index);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          {isAnalyzeImageLoading && <div>Our AI analyzing your image...</div>}

          {aiResponse && !isAnalyzeImageLoading && (
            <div className="chat-simulation">
              <TypingEffect
                text={aiResponse.choices[0].message.content}
                speed={50}
              />
            </div>
          )}
          {(isCreateNFTMetadataLoading || isSendingUserOperation) && (
            <div className="mt-2">
              Some Unique NFT is being prepared for you...
            </div>
          )}
        </div>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-primary"
          onClick={closeModal}
          disabled={isAnalyzeImageLoading}
        >
          Cancel
        </button>
        {images.length && !aiResponse ? (
          <button
            className="btn btn-primary"
            onClick={submit}
            disabled={isAnalyzeImageLoading}
          >
            Analyze
          </button>
        ) : (
          <></>
        )}
        {aiResponse && (
          <button
            className="btn btn-primary"
            onClick={handleCreateNFTMetadata}
            disabled={isAnalyzeImageLoading}
          >
            Create
          </button>
        )}
      </div>
    </Modal>
  );
};
