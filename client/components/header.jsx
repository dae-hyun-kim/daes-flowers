import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.changeView = this.changeView.bind(this);
  }

  changeView() {
    const changeViewMethod = this.props.setView;
    changeViewMethod('cart', {});
  }

  render() {
    return (
      <div className="d-flex justify-content-between">
        <div>
          <h1>Logo</h1>
        </div>
        <div className="d-flex align-items-center">
          <p>{`${this.props.cartItemCount} Items`}</p>
          <i onClick={this.changeView} className="fas fa-shopping-cart fa-3x"></i>
        </div>
      </div>
    );
  }
}
