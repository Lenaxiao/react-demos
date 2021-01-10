import React from "react";
import "./Swiper.css";

class Swiper extends React.Component {
  constructor(props) {
    super(props);
    this.images = [1, 2, 3, 4, 5];
    this.colors = ["#F07260", "#F0DB48", "#C1F03C", "#3C81F0", "#C054F0"];
    this.state = {
      index: 0,
      translate: 0
    };
    this.jumpToNext = this.jumpToNext.bind(this);
    this.autoPlay = props.autoPlay;
    this.timer = null;
  }
  componentDidMount() {
    if (!this.autoPlay) return;
    this.timer = setTimeout(() => {
      this.setState({
        index: 1,
        translate: -100
      });
    }, 2000);
  }
  componentDidUpdate() {
    if (!this.autoPlay) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState(state => ({
        index: (state.index + 1) % this.images.length,
        translate: -100 * ((state.index + 1) % this.images.length)
      }));
    }, 2000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  jumpToNext(id) {
    let distance = -100 * id;
    console.log(distance);
    this.setState({
      translate: distance,
      index: id
    });
  }
  render() {
    return (
      <div className="swiper">
        <div
          className="swiper-content"
          style={{ transform: `translate(${this.state.translate}%)` }}
        >
          {this.images.map((item, index) => {
            return (
              <div
                className="image"
                key={item}
                style={{ backgroundColor: this.colors[index] }}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="circles">
          {this.images.map((item, index) => {
            return (
              <div
                className={`circle ${
                  this.state.index == index ? "active" : ""
                }`}
                key={item}
                onClick={() => this.jumpToNext(index)}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Swiper;
