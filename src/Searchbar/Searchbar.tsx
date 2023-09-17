import React from "react";
import toast, { Toaster } from "react-hot-toast";
import svg from "./loupe_icon.svg";

interface IState {
  query: string;
}

interface ISearchbar {
  onSubmit: (query: string) => void;
}

export class Searchbar extends React.Component<ISearchbar, IState> {
  state = {
    query: "",
  };

  onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (this.state.query === "") {
      toast.error("Fill the input!");
      return;
    }
    this.props.onSubmit(this.state.query);
  };

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const inputRef = e.target as HTMLInputElement;
    this.setState({ query: inputRef.value });
  };

  render() {
    return (
      <>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.onSubmit}>
            <button
              type="submit"
              className="SearchForm-button"
              style={{ backgroundImage: `url(${svg})` }}
            >
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              onChange={this.onChange}
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
            />
          </form>
          <Toaster position="top-right" />
        </header>
      </>
    );
  }
}
