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
    this.interval = null;
    this.nextImage = this.nextImage.bind(this);
    this.startInterval = this.startInterval.bind(this);
    this.generateCircles = this.generateCircles.bind(this);
    this.selectImage = this.selectImage.bind(this);
  }

  nextImage() {
    if (this.state.imageIndex === carouselImages.length - 1) {
      this.setState({
        imageIndex: 0
      });
    } else if (this.state.pause === false) {
      this.setState({
        imageIndex: this.state.imageIndex + 1
      });
    } else {
      setTimeout(() => {
        this.setState({
          pause: false
        });
      }, 3000);
    }
  }

  selectImage(event) {
    event.preventDefault();
    this.setState({
      imageIndex: parseInt(event.currentTarget.id),
      pause: true
    });
  }

  startInterval() {
    if (this.state.loaded === false) {
      this.interval = setInterval(this.nextImage, 3000);
    }
  }

  componentDidMount() {
    this.setState({
      loaded: true
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  generateCircles() {
    const circles = carouselImages.map((image, index) => {
      return (
        <div key={index} id={index} onClick={this.selectImage} className={index === this.state.imageIndex ? 'closedCircle' : 'openCircle'}></div>
      );
    });
    return circles;
  }

  render() {
    this.startInterval();
    return (
      <div className="text-center">
        <div className="d-flex justify-content-center align-items-center carousel-image-box">
          <img src={carouselImages[this.state.imageIndex]} alt="" className="carousel-image-sizing"/>
        </div>
        <div className="col-12 header-divider"></div>
        <div className="d-flex justify-content-center">
          <div className="carousel-circle-box col-2 d-flex justify-content-center">
            {this.generateCircles()}
          </div>
        </div>
      </div>
    );
  }
}
