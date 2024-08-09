import Modal from "react-modal";
import ImageUploading, { ImageType } from "react-images-uploading";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
  const maxNumber = 1;
  const onChange = (images: any) => {
    setImages(images);
  };

  const submit = () => {
    analyzeImage(images[0]);
  };

  const sendImage = async (file: ImageType) => {
    return axios.post("http://localhost:4000/chat-gpt/analyzeImage", {
      data_url: file.data_url,
    });
  };

  const { isPending: isAnalyzeImageLoading, mutate: analyzeImage } =
    useMutation({
      mutationFn: (file: ImageType) => {
        return sendImage(file);
      },
    });

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
                  type="button"
                  className="btn btn-primary"
                  onClick={onImageUpload}
                  {...dragProps}
                  disabled={!!images.length}
                >
                  Click for file upload
                </button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.data_url} className="image-item-photo" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={submit}>
          Create
        </button>
      </div>
    </Modal>
  );
};
