import React from "react";
import axios from "axios";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";

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
  };

  async componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<IState>
  ) {
    if (prevState.query !== this.state.query && this.state.query !== "") {
      this.resetImages();
      this.onFetchImages(this.state.query, this.state.page);
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.onFetchImages(this.state.query, this.state.page);
    }
  }

  onFetchImages = async (query: string, page: number) => {
    const API = axios.create({
      baseURL: `https://pixabay.com/api/?q=${query}&page=${page}&key=26229759-3aa7093be117df00e52b30f1f&image_type=photo&orientation=horizontal&per_page=12`,
    });

    const response: IResponse = await API.get("/search?query=react");

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
      };
    });
  };

  onSubmit = (query: string) => {
    this.setState({ query });
  };

  onLoadMore = () => {
    this.setState((prevState) => {
      return { ...prevState, page: prevState.page + 1 };
    });
  };

  resetImages = () => {
    this.setState((prevState) => {
      return { ...prevState, showLoadMore: false, images: [] };
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.showLoadMore && <Button onClick={this.onLoadMore} />}
      </>
    );
  }
}

export default App;
