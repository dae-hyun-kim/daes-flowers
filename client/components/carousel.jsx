import React from 'react';

const carouselImages = [
  'images/carousel1.jpg',
  'images/carousel2.jpg',
  'images/carousel3.jpg',
  'images/carousel4.jpg'
];

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      loaded: false,
      pause: false
    };
    this.nextImage = this.nextImage.bind(this);
    this.startInterval = this.startInterval.bind(this);
  }

  nextImage() {
    if (this.state.imageIndex === carouselImages.length - 1) {
      this.setState({
        imageIndex: 0
      });
    } else {
      this.setState({
        imageIndex: this.state.imageIndex + 1
      });
    }
  }

  startInterval() {
    if (this.state.loaded === false) {
      setInterval(this.nextImage, 5000);
    }
  }

  componentDidMount() {
    this.setState({
      loaded: true
    });
  }

  render() {
    this.startInterval();
    return (
      <div>
        <div className="carousel-image-box">
          <img src={carouselImages[this.state.imageIndex]} alt="" className="carousel-image-sizing"/>
        </div>
      </div>
    );
  }
}
