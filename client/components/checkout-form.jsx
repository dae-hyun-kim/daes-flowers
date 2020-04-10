import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      error: false
    };
    this.handleName = this.handleName.bind(this);
    this.handleCreditCard = this.handleCreditCard.bind(this);
    this.handleShippingAddress = this.handleShippingAddress.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.changeView = this.changeView.bind(this);
    this.priceTotal = this.priceTotal.bind(this);
    this.displayError = this.displayError.bind(this);
  }

  handleName(event) {
    this.setState({
      name: event.currentTarget.value
    });
  }

  handleCreditCard(event) {
    this.setState({
      creditCard: event.currentTarget.value
    });
  }

  handleShippingAddress(event) {
    this.setState({
      shippingAddress: event.currentTarget.value
    });
  }

  handlePlaceOrder(event) {
    event.preventDefault();
    if (!this.state.name || !this.state.creditCard || !this.state.shippingAddress) {
      this.setState({
        error: true
      });
    } else {
      const placeOrderMethod = this.props.placeOrder;
      this.setState({
        error: false
      });
      const customerInfoObject = {
        name: this.state.name,
        creditCard: this.state.creditCard,
        shippingAddress: this.state.shippingAddress
      };
      placeOrderMethod(customerInfoObject);
    }
  }

  changeView(event) {
    event.preventDefault();
    const changeViewMethod = this.props.setView;
    changeViewMethod('catalog', {});
  }

  displayError() {
    if (this.state.error === true) {
      return (
        <h4 className="font-styling text-center error-message mt-3">Please fill out form to complete order.</h4>
      );
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

  render() {
    return (
      <div className="checkout-container d-flex justify-content-center align-items-center">
        <div className="checkout-content checkout-font">
          <div>
            <h1 className="font-styling checkout-heading mb-4">Checkout</h1>
            <h3 className="final-order-total">{`Order Total: $${this.priceTotal()}`}</h3>
            {this.displayError()}
          </div>
          <form>

            <div>
              <label htmlFor="name" className="checkout">
                <h5>Name:</h5>
                <input htmlFor="name" type="text" onChange={this.handleName} value={this.state.name} className="checkout-inputs"/>
              </label>
            </div>

            <div>
              <label htmlFor="creditCard" className="checkout">
                <h5>Credit Card:</h5>
                <input htmlFor="creditCard" type="text" onChange={this.handleCreditCard} value={this.state.creditCard} className="checkout-inputs"/>
              </label>
            </div>

            <div>
              <label htmlFor="shippingAddress" className="checkout">
                <h5>Shipping Address:</h5>
                <textarea htmlFor="shippingAddress" name="address" id="address" onChange={this.handleShippingAddress} value={this.state.shippingAddress} className="checkout-inputs"></textarea>
              </label>
            </div>

            <div className="d-flex justify-content-between mt-4 place-order-container">
              <button className="btn btn-pink continue-shopping-size mt-2 mb-2" onClick={this.changeView}>Continue Shopping</button>
              <button onClick={this.handlePlaceOrder} className="btn btn-success mt-2 mb-2">Place Order</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
