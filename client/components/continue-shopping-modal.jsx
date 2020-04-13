import React from 'react';

export default class ContinueShoppingModal extends React.Component {
  constructor(props) {
    super(props);
    this.continueShoppingHandler = this.continueShoppingHandler.bind(this);
    this.goToCartHandler = this.goToCartHandler.bind(this);
  }

  continueShoppingHandler() {
    const setViewMethod = this.props.setView;
    setViewMethod('catalog');
  }

  goToCartHandler() {
    const setViewMethod = this.props.setView;
    setViewMethod('cart');
  }

  render() {
    return (
      <div className="continue-shopping-modal text-center">
        <div className="continue-shopping-modal-inner">
          <div className="mt-2">
            <h3>New items have been added to cart.</h3>
          </div>
          <div className="mt-3">
            <h5>Item: {this.props.name}</h5>
            <h5>Quantity: {this.props.quantity}</h5>
          </div>
          <div className="d-flex justify-content-around mt-4">
            <button className="btn btn-pink" onClick={this.continueShoppingHandler}>Continue Shopping</button>
            <button className="btn btn-success font-styling" onClick={this.goToCartHandler}>Go To Cart</button>
          </div>
        </div>
      </div>
    );
  }
}
