import Modal from "react-modal";
import { ImageUpload } from "./ImageUpload";

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
  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div className="modal-header">
        <h2>Create NFT!</h2>
      </div>

      <div className="modal-body">
        <ImageUpload />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Create
        </button>
      </div>
    </Modal>
  );
};
