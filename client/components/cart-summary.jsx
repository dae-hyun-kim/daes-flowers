import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.createCartItems = this.createCartItems.bind(this);
    this.priceTotal = this.priceTotal.bind(this);
  }

  createCartItems() {
    const cartItemList = this.props.cartItemList;
    if (!cartItemList) {
      return (
        <div>NO ITEMS IN CART</div>
      );
    } else {
      const allCartItems = cartItemList.map((cartItem, index) => {
        return (
          <CartSummaryItem item={cartItem} key={index} />
        );
      });
      return allCartItems;
    }
  }

  priceTotal() {
    if (this.props.cartItemList) {
      const totalPrice = this.props.cartItemList.reduce((prev, cur) => {
        return prev + cur.price;
      }, 0);
      const priceTotalReformat = (totalPrice / 100).toFixed(2);
      return priceTotalReformat;
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div className="d-flex flex-wrap justify-content-center">
        <div className="col-10">
          <div>Back To Catalog</div>
          <h2>My Cart</h2>
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          {this.createCartItems()}
        </div>
        <div className="col-10">
          <div>
            <h2>{`Item Total: $${this.priceTotal()}`}</h2>
          </div>
        </div>
      </div>
    );
  }
}
