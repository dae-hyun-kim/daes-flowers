import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div className="d-flex justify-content-between">
        <div>
          <h1>Logo</h1>
        </div>
        <div className="d-flex align-items-center">
          <p>{`${this.props.cartItemCount} Items`}</p>
          <i className="fas fa-shopping-cart fa-3x"></i>
        </div>
      </div>
    );
  }
}
