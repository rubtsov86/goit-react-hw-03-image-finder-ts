import React from "react";

interface IProp {
  imageUrl: string;
  id: string;
}

export const ImageGalleryItem: React.FC<IProp> = ({ imageUrl, id }) => {
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={imageUrl} alt="" id={id} />
    </li>
  );
};
