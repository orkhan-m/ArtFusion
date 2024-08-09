import Modal from "react-modal";
import ImageUploading from "react-images-uploading";
import { useState } from "react";

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
  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const submit = () => {
    console.log(images);
  };

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
            acceptType={["jpg"]}
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
                    <img
                      src={image.data_url}
                      alt=""
                      className="image-item-photo"
                    />
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
