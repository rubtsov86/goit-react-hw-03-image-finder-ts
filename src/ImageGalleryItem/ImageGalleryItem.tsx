import React from "react";

interface IProp {
  imageUrl: string;
}

export const ImageGalleryItem: React.FC<IProp> = ({ imageUrl }) => {
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={imageUrl} alt="" />
    </li>
  );
};
