"use client";

import Modal from "react-modal";
import ImageUploading, { ImageType } from "react-images-uploading";
import { useState } from "react";
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

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateNFTModal: React.FC<IProps> = ({ isOpen, onClose }) => {
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

  const { isPending: isAnalyzeImageLoading, mutate: analyzeImage } =
    useMutation({
      mutationFn: (file: ImageType) => {
        return sendImage(file);
      },
      onSuccess: (data) => {
        setAiResponse(data);
      },
    });

  const test = async () => {
    console.log("test");
    const tokenUri = "ipfs://QmUYxc1mWMDtc2PLbr9rd1GxVTJheU288LAxR6dQko2W3W";
    const uoCallData = encodeFunctionData({
      abi: CONTRACT_ABI,
      functionName: "mintNFT",
      args: [tokenUri, user?.address],
    });
    sendUserOperation({
      uo: {
        // NOTE: targeting user's wallet address
        // target: wallet as Hex,
        target: DEFAULT_CONTRACT_ADDRESS as Hex,
        data: uoCallData,
      },
    });
  };

  const removeImage = (index: number) => {};

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
            acceptType={["jpg", "png"]}
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
        </div>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-primary"
          onClick={onClose}
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
            onClick={submit}
            disabled={isAnalyzeImageLoading}
          >
            Create
          </button>
        )}
      </div>
    </Modal>
  );
};
