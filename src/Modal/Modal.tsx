import React from "react";
import { createPortal } from "react-dom";

interface IProps {
  image: string;
  onClose: () => void;
}

const modalRoot = document.querySelector("#modal-root") as HTMLDivElement;

export class Modal extends React.Component<IProps> {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.handleKeydown);
  }

  handleOverlay = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  handleKeydown = (e: KeyboardEvent): void => {
    console.log(e.code);
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlay}>
        <div className="Modal">
          <img src={this.props.image} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
