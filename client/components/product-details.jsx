import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 3
    };
    this.handleClick = this.handleClick.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const changeProductDetailsMethod = this.props.productViewStyle;
    changeProductDetailsMethod('catalog', {});
  }

  addItemToCart(event) {
    const addItemMethod = this.props.addToCart;
    addItemMethod(this.state.product, this.state.quantity);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.productView.productId}`)
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
        <div className="product-details-container">
          <div className="col-12 product-details mt-3 mb-3">
            <div className="product-details-head d-flex align-items-center">
              <button className="btn btn-pink" onClick={this.handleClick}>Back To Catalog</button>
            </div>
            <div className="d-flex justify-content-around flex-wrap">
              <div className="col-5 product-detail-image-container">
                <img src={this.state.product.image} className="product-details-image" alt="flower image"/>
              </div>
              <div className="col-5 product-details-info ">
                <h2 className="font-styling flower-name">{this.state.product.name}</h2>
                <h3 className="font-styling">{`$${priceReformat}`}</h3>
                <p className="flower-info-text">{this.state.product.shortDescription}</p>
                <div className="d-flex justify-content-center">
                  <div>
                    <i className="fas fa-minus"></i>
                  </div>
                  <input type="number"/>
                  <div>
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
                <div>
                  <button onClick={this.addItemToCart} className="btn btn-success success">Add To Cart</button>
                </div>
              </div>
            </div>
            <div>
              <p className="flower-info-text mt-5">{this.state.product.longDescription}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (null);
    }
  }
}
