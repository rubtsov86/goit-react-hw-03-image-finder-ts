import React from "react";
import { createPortal } from "react-dom";

interface IProps {
  image: string;
}

const modalRoot = document.querySelector("#modal-root") as HTMLDivElement;

export class Modal extends React.Component<IProps> {
  render() {
    return createPortal(
      <div className="Overlay">
        <div className="Modal">
          <img src={this.props.image} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
