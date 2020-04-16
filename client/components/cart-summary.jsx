import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dim: false
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
        <h1 className="font-styling">NO ITEMS IN CART</h1>
      );
    } else {
      const allCartItems = cartItemList.map((cartItem, index) => {
        return (
          <CartSummaryItem item={cartItem} key={index} removeFromCart={this.props.removeFromCart} getCart={this.props.getCart}/>
        );
      });
      return allCartItems;
    }
  }

  priceTotal() {
    if (this.props.cartItemList) {
      const totalPrice = this.props.cartItemList.reduce((prev, cur) => {
        return prev + cur.totalprice;
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
      return (<button onClick={this.toCheckOut} className="btn btn-success success mt-3 mb-3">Proceed to Checkout</button>);
    }
  }

  render() {
    return (
      <div>
        <div className="d-flex flex-wrap justify-content-center cart-summary-container">
          <div className="col-10 mt-3">
            <button className="btn btn-pink" onClick={this.changeView}>Back To Catalog</button>
            <h1 className="mt-4 font-styling text-center my-cart-heading">My Cart</h1>
          </div>
          <div className="d-flex justify-content-center flex-wrap">
            {this.createCartItems()}
          </div>
          <div className="col-12 mt-5 mb-5">
            <div className="checkout-box">
              <h2 className="font-styling mt-3 mb-3">{`Item Total: $${this.priceTotal()}`}</h2>
              {this.hideCheckoutButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
