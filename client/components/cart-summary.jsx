import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.createCartItems = this.createCartItems.bind(this);
    this.priceTotal = this.priceTotal.bind(this);
    this.changeView = this.changeView.bind(this);
    this.toCheckOut = this.toCheckOut.bind(this);
    this.hideCheckoutButton = this.hideCheckoutButton.bind(this);
  }

  createCartItems() {
    const cartItemList = this.props.cartItemList;
    if (cartItemList.length === 0) {
      return (
        <h1>NO ITEMS IN CART</h1>
      );
    } else {
      const allCartItems = cartItemList.map((cartItem, index) => {
        return (
          <CartSummaryItem item={cartItem} key={index} removeFromCart={this.props.removeFromCart}/>
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

  changeView() {
    const changeViewMethod = this.props.setView;
    changeViewMethod('catalog', {});
  }

  toCheckOut() {
    const changeViewMethod = this.props.setView;
    changeViewMethod('checkout', {});
  }

  hideCheckoutButton() {
    const cartItemList = this.props.cartItemList;
    if (cartItemList.length === 0) {
      return '';
    } else {
      return (<button onClick={this.toCheckOut} className="btn btn-success">Checkout</button>);
    }
  }

  render() {
    return (
      <div className="d-flex flex-wrap justify-content-center">
        <div className="col-10">
          <div onClick={this.changeView}>Back To Catalog</div>
          <h2>My Cart</h2>
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          {this.createCartItems()}
        </div>
        <div className="col-10">
          <div className="d-flex justify-content-around">
            <h2>{`Item Total: $${this.priceTotal()}`}</h2>
            {this.hideCheckoutButton()}
          </div>
        </div>
      </div>
    );
  }
}
