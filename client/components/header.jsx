import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.changeView = this.changeView.bind(this);
    this.priceTotal = this.priceTotal.bind(this);
  }

  changeView() {
    const changeViewMethod = this.props.setView;
    changeViewMethod('cart', {});
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
      <div className="website-header d-flex justify-content-between">
        <div className="header-content d-flex justify-content-center align-items-center">
          <div className="nav">SHOP</div>
          <div className="nav">ABOUT US</div>
          <div className="nav">CONTACT</div>
        </div>
        <div className="header-content d-flex justify-content-center logo-container">
          <img className="logo" src="images/logo.png" alt=""/>
        </div>
        <div className="header-content d-flex justify-content-center align-items-center">
          <i onClick={this.changeView} className="fas fa-shopping-cart fa-2x"></i>
          <span>{`(${this.props.cartItemCount})`}</span>
          <span>{`($${this.priceTotal()})`}</span>
        </div>
      </div>
    );
  }
}
