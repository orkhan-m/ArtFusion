"use client";

import { useState } from "react";
import ImageUploading from "react-images-uploading";

export const ImageUpload: React.FC = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
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
                <img src={image.data_url} alt="" className="image-item-photo" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
