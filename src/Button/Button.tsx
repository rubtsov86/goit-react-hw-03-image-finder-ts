import React from "react";

interface IProps {
  onClick: () => void;
}

export const Button: React.FC<IProps> = ({ onClick }) => {
  return (
    <button type="button" className="Button" onClick={onClick}>
      Load more
    </button>
  );
};
