import React from "react";
import { IData } from "../App";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

interface IProps {
  images: IData[];
  onClick: (e: React.MouseEvent) => void;
}

export const ImageGallery: React.FC<IProps> = ({ images, onClick }) => {
  return (
    <ul className="ImageGallery" onClick={onClick}>
      {images.map(({ id, webformatURL }) => (
        <ImageGalleryItem key={id} imageUrl={webformatURL} id={id} />
      ))}
    </ul>
  );
};
