import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Blocks } from "react-loader-spinner";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";

export interface IData {
  id: string;
  webformatURL: string;
  largeImageURL: string;
}

interface IState {
  images: IData[];
  page: number;
  query: string;
  showLoadMore: boolean;
  isLoading: boolean;
  showModal: string;
}

interface IResponse {
  data: {
    hits: IData[];
    totalHits: number;
  };
}

class App extends React.Component<{}, IState> {
  state = {
    images: [],
    page: 1,
    query: "",
    showLoadMore: false,
    isLoading: false,
    showModal: "",
  };

  async componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<IState>
  ) {
    if (prevState.query !== this.state.query) {
      this.onFetchImages(this.state.query, this.state.page);
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.onFetchImages(this.state.query, this.state.page);
    }
  }

  onHideLoading = () => {
    this.setState({ isLoading: false });
  };

  onFetchImages = async (query: string, page: number) => {
    this.setState((state: IState) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    const API = axios.create({
      baseURL: `https://pixabay.com/api/?q=${query}&page=${page}&key=26229759-3aa7093be117df00e52b30f1f&image_type=photo&orientation=horizontal&per_page=12`,
    });

    const response: IResponse = await API.get("/search?query=react");

    if (response.data.hits.length === 0) {
      toast.error("Ups... We don't find any images, try something else");
      setTimeout(this.onHideLoading, 3000);
      return;
    }

    const newImages = response.data.hits.map(
      ({ id, webformatURL, largeImageURL }) => {
        return { id, webformatURL, largeImageURL };
      }
    );

    const totalImages = this.state.images.length + newImages.length;

    this.setState((state: IState) => {
      return {
        ...state,
        images: [...state.images, ...newImages],
        showLoadMore: totalImages === response.data.totalHits ? false : true,
        isLoading: false,
      };
    });
  };

  onSubmit = (query: string) => {
    this.resetImages();
    this.setState({ query });
  };

  onLoadMore = () => {
    this.setState((prevState) => {
      return { ...prevState, page: prevState.page + 1 };
    });
  };

  resetImages = () => {
    this.setState((prevState) => {
      return { ...prevState, showLoadMore: false, images: [], page: 1 };
    });
  };

  onClickImage = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).nodeName !== "IMG") {
      return;
    }
    const imageId = (e.target as HTMLImageElement).id;

    const imageToClick: IData = this.state.images.find(
      ({ id }) => id === Number(imageId)
    )!;

    this.setState((prevState: IState) => {
      return { ...prevState, showModal: imageToClick.largeImageURL };
    });
  };

  onCloseModal = () => {
    this.setState((prevState) => {
      return { ...prevState, showModal: "" };
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={this.state.images} onClick={this.onClickImage} />
        {this.state.showLoadMore && <Button onClick={this.onLoadMore} />}
        <Toaster position="top-right" />

        {this.state.isLoading && (
          <div className="spinner-container">
            <Blocks
              visible={true}
              height="120"
              width="120"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
            />
          </div>
        )}

        {this.state.showModal && (
          <Modal image={this.state.showModal} onClose={this.onCloseModal} />
        )}
      </>
    );
  }
}

export default App;
