import React from "react";
import "./FlipCard.css";

const DICTIONARY = [
  { hello: "你好" },
  { restrict: "限制" },
  { goodbye: "再见" }
];

class FlipCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      word: "hey"
    };
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.timer = null;
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState(state => ({
        word: Object.values(DICTIONARY[state.page - 1])[0]
      }));
    }, 5000);
  }

  componentDidUpdate() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState(state => ({
        word: Object.values(DICTIONARY[state.page - 1])[0]
      }));
    }, 5000);
  }

  goToPreviousPage() {
    if (this.state.page === 1) return;
    let prevID = this.state.page - 1;
    this.setState({
      page: prevID,
      word: Object.keys(DICTIONARY[prevID - 1])[0]
    });
  }
  goToNextPage() {
    if (this.state.page === DICTIONARY.length) return;
    let nextID = this.state.page + 1;
    this.setState({
      page: nextID,
      word: Object.keys(DICTIONARY[nextID - 1])[0]
    });
  }
  render() {
    return (
      <div className="flip-card-container">
        <div className="content-area">{this.state.word}</div>
        <div className="btn-wrap">
          <div className="prev" onClick={this.goToPreviousPage}>
            previous
          </div>
          <div className="page">{this.state.page}</div>
          <div className="next" onClick={this.goToNextPage}>
            next
          </div>
        </div>
      </div>
    );
  }
}

export default FlipCard;
