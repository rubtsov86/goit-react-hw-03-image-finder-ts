import React from "react";
import axios from "axios";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export interface IData {
  id: string;
  webformatURL: string;
  largeImageURL: string;
}

interface IState {
  images: IData[];
  page: number;
  query: string;
}

interface IResponse {
  data: {
    hits: IData[];
  };
}

class App extends React.Component<{}, IState> {
  state = {
    images: [],
    page: 1,
    query: "",
  };

  async componentDidMount() {
    // if (response) {
    //   this.setState({ images:  });
    // }
  }

  async componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<IState>
  ) {
    if (prevState.query !== this.state.query) {
      const API = axios.create({
        baseURL: `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=26229759-3aa7093be117df00e52b30f1f&image_type=photo&orientation=horizontal&per_page=12`,
      });
      const response: IResponse = await API.get("/search?query=react");
      const newImages = response.data.hits.map(
        ({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        }
      );
      console.log(newImages);

      this.setState((state: IState) => {
        return { ...state, images: newImages };
      });
      console.log(response.data.hits);
    }
  }

  onSubmit = (query: string) => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={this.state.images} />
      </>
    );
  }
}

export default App;
