import React from 'react';

export default class ThankYouPage extends React.Component {
  constructor(props) {
    super(props);
    this.changeToCatalog = this.changeToCatalog.bind(this);
  }

  changeToCatalog(event) {
    event.preventDefault();
    const setViewMethod = this.props.setView;
    setViewMethod('catalog');
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="col-12 text-center font-styling mt-5">
          <h1 className="about-title mt-4">Thank You!</h1>
          <h2>Your Order has been placed</h2>
          <p className="contact-text">Please check your email for confirmation. If anything looks wrong, or there is a problem with your order, please reach out to us.</p>
        </div>
        <div className="mt-5 text-center">
          <button onClick={this.changeToCatalog} className="btn btn-pink thank-you-button">Continue Shopping</button>
        </div>
      </div>
    );
  }
}
