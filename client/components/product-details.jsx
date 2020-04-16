import React from 'react';
import ContinueShoppingModal from './continue-shopping-modal';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1,
      error: false,
      continueModal: false,
      dim: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.displayError = this.displayError.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const changeProductDetailsMethod = this.props.productViewStyle;
    changeProductDetailsMethod('catalog', {});
  }

  addItemToCart(event) {
    if (this.state.quantity === 0) {
      this.setState({
        error: true
      });
    } else {
      this.setState({
        error: false,
        continueModal: true,
        dim: true
      });
      const addItemMethod = this.props.addToCart;
      addItemMethod(this.state.product, this.state.quantity);
    }
  }

  changeQuantityHandler(event) {
    this.setState({
      quantity: parseInt(event.currentTarget.value)
    });
  }

  incrementQuantity(event) {
    let productQuantity = this.state.quantity;
    this.setState({
      quantity: ++productQuantity
    });
  }

  decrementQuantity(event) {
    let productQuantity = this.state.quantity;
    if (productQuantity === 0) {
      return (null);
    } else {
      this.setState({
        quantity: --productQuantity
      });
    }
  }

  displayError() {
    if (this.state.error === true) {
      return (
        <h4 className="font-styling text-center error-message mt-3">Please Enter Quantity</h4>
      );
    }
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
        <div>
          {this.state.continueModal === true ? <ContinueShoppingModal name={this.state.product.name} quantity={this.state.quantity} setView={this.props.setView}/> : null}
          <div className={this.state.dim === true ? 'dim' : null}>
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
                    <div>
                      {this.displayError()}
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="d-flex align-items-center justify-content-center quantity-changer" onClick={this.decrementQuantity}>
                        <i className="fas fa-minus"></i>
                      </div>
                      <input type="number" className="text-center quantity-input" onChange={this.changeQuantityHandler} value={this.state.quantity}/>
                      <div className="d-flex align-items-center justify-content-center quantity-changer" onClick={this.incrementQuantity}>
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
          </div>
        </div>
      );
    } else {
      return (null);
    }
  }
}
