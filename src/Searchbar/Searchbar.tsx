import React from "react";

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
    this.props.onSubmit(this.state.query);
    this.reset();
  };

  reset = () => {
    this.setState({ query: "" });
  };

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const inputRef = e.target as HTMLInputElement;
    this.setState({ query: inputRef.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
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
      </header>
    );
  }
}
