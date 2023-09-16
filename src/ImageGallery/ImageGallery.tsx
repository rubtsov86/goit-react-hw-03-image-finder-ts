import React from "react";
import { IData } from "../App";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

interface IProps {
  images: IData[];
}

export const ImageGallery: React.FC<IProps> = ({ images }) => {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL }) => (
        <ImageGalleryItem key={id} imageUrl={webformatURL} />
      ))}
    </ul>
  );
};
