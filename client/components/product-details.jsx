import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null

    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.state.product}`)
      .then(response => {
        return response.json();
      }).then(result => {
        this.setState({
          product: result
        });
      });
  }

  render() {
    if (this.state.product) {
      const priceReformat = (this.state.product.price / 100).toFixed(2);
      return (
        <div className="col-12 product-details">
          <div className="product-details-head d-flex align-items-center">
            <button>Back to Catalog</button>
          </div>
          <div className="d-flex justify-content-around">
            <div className="col-5">
              <img src={this.state.product.image} className="product-details-image" alt=""/>
            </div>
            <div className="col-5 product-details-info">
              <h2>{this.state.product.name}</h2>
              <h3>{`$${priceReformat}`}</h3>
              <p>{this.state.product.shortDescription}</p>
            </div>
          </div>
          <div>
            <p>{this.state.product.longDescription}</p>
          </div>
        </div>
      );
    } else {
      return (null);
    }
  }
}
