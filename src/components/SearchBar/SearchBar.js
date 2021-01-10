import React from "react";
import "./SearchBar.css";
import Trie from "./Trie";

const DICTIONARY = [
  "a",
  "cat",
  "dog",
  "donut",
  "cabbage",
  "cake",
  "corona",
  "affect"
];
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.trie = new Trie(DICTIONARY);
    this.state = {
      targetList: [],
      input: ""
    };
    this.onTyping = this.onTyping.bind(this);
    this.onWordClick = this.onWordClick.bind(this);
  }
  componentDidMount() {}
  onTyping(e) {
    this.setState({
      input: e.target.value,
      targetList: this.trie.search(e.target.value)
    });
  }
  onWordClick(e) {
    this.setState({
      input: e.target.innerText,
      targetList: []
    });
  }
  render() {
    return (
      <div className="search-bar-container">
        <input
          id="search-bar"
          type="text"
          className="search"
          placeholder="请输入..."
          onChange={event => this.onTyping(event)}
          value={this.state.input}
          autoComplete="off"
        ></input>
        <div
          className={`results ${
            this.state.input == "" || this.state.targetList.length == 0
              ? "hide"
              : ""
          }`}
        >
          {this.state.targetList.map(item => {
            return (
              <div
                className="item"
                key={item}
                onClick={e => this.onWordClick(e)}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchBar;
