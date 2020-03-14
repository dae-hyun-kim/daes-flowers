import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  removeFromCart(event) {
    const cartItemId = event.currentTarget.id;
    const removeCartItemMethod = this.props.removeFromCart;
    removeCartItemMethod(cartItemId);
  }

  render() {
    const theItem = this.props.item;
    const priceReformat = (theItem.price / 100).toFixed(2);
    return (
      <div className="d-flex justify-content-around cart-item-container col-10 cart-item-border">
        <div className="col-5">
          <img src={theItem.image} alt="" className="cart-summary-img-styling"/>
        </div>
        <div className="d-flex align-items-center">
          <div className="col-12">
            <h2>{theItem.name}</h2>
            <h3>{`$${priceReformat}`}</h3>
            <p>{theItem.shortDescription}</p>
            <button onClick={this.removeFromCart} id={this.props.item.cartItemId} className="btn btn-danger">Remove Item</button>
          </div>
        </div>
      </div>
    );
  }
}
