import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phonenumber: '',
      shippingAddress: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: '',
      creditCard: '',
      expiremonth: '',
      expireyear: '',
      cvv: '',
      error: false,
      formValidation: {
        name: true,
        email: true,
        phonenumber: true,
        shippingAddress: true,
        shippingCity: true,
        shippingState: true,
        shippingZip: true,
        creditCard: true,
        expiremonth: true,
        expireyear: true,
        cvv: true
      }
    };
    this.handleName = this.handleName.bind(this);
    this.handleCreditCard = this.handleCreditCard.bind(this);
    this.handleShippingAddress = this.handleShippingAddress.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.changeView = this.changeView.bind(this);
    this.priceTotal = this.priceTotal.bind(this);
    this.displayError = this.displayError.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handleShippingCity = this.handleShippingCity.bind(this);
    this.handleShippingState = this.handleShippingState.bind(this);
    this.handleShippingZip = this.handleShippingZip.bind(this);
    this.handleExpireMonth = this.handleExpireMonth.bind(this);
    this.handleExpireYear = this.handleExpireYear.bind(this);
    this.handleCVV = this.handleCVV.bind(this);
  }

  handleName(event) {
    this.setState({
      name: event.currentTarget.value
    });
  }

  handleEmail(event) {
    this.setState({
      email: event.currentTarget.value
    });
  }

  handlePhoneNumber(event) {
    this.setState({
      phonenumber: event.currentTarget.value
    });
  }

  handleShippingAddress(event) {
    this.setState({
      shippingAddress: event.currentTarget.value
    });
  }

  handleShippingCity(event) {
    this.setState({
      shippingCity: event.currentTarget.value
    });
  }

  handleShippingState(event) {
    this.setState({
      shippingState: event.currentTarget.value
    });
  }

  handleShippingZip(event) {
    this.setState({
      shippingZip: event.currentTarget.value
    });
  }

  handleCreditCard(event) {
    const numRegex = RegExp(/^[0-9]*$/);
    if (numRegex.test(event.currentTarget.value) === false) {
      return null;
    } else {
      this.setState({
        creditCard: event.currentTarget.value
      });
    }
  }

  handleExpireMonth(event) {
    this.setState({
      expiremonth: event.currentTarget.value
    });
  }

  handleExpireYear(event) {
    this.setState({
      expireyear: event.currentTarget.value
    });
  }

  handleCVV(event) {
    this.setState({
      cvv: event.currentTarget.value
    });
  }

  handlePlaceOrder(event) {
    event.preventDefault();
    if (this.state.name.length > 65 || this.state.name.length < 5) {
      this.setState({
        error: true
      });
    } else if (this.state.creditCard.length < 16) {
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
        email: this.state.email,
        phonenumber: this.state.phonenumber,
        shippingAddress: this.state.shippingAddress,
        city: this.state.shippingCity,
        state: this.state.shippingState,
        zip: this.state.shippingZip,
        creditCard: this.state.creditCard,
        expiremonth: this.state.expiremonth,
        expireyear: this.state.expireyear,
        cvv: this.state.cvv
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
                <h5>Full Name:</h5>
                <input htmlFor="name" type="text" onChange={this.handleName} value={this.state.name} className="checkout-inputs" minLength="5" maxLength="65"/>
              </label>
            </div>

            <div>
              <label htmlFor="email">
                <h5>Email:</h5>
                <input htmlFor="email" type="email" onChange={this.handleEmail} value={this.state.email}/>
              </label>

              <label htmlFor="phone">
                <h5>Phone Number:</h5>
                <input htmlFor="phone" type="tel" onChange={this.handlePhoneNumber} value={this.state.phonenumber}/>
              </label>
            </div>

            <div>
              <label htmlFor="address" className="checkout">
                <h5>Shipping Address:</h5>
                <textarea htmlFor="shippingAddress" name="address" id="address" onChange={this.handleShippingAddress} value={this.state.shippingAddress} className="checkout-inputs"></textarea>
              </label>
            </div>

            <div>
              <label htmlFor="city">
                <h5>City:</h5>
                <input htmlFor="city" type="text" onChange={this.handleShippingCity} value={this.state.shippingCity}/>
              </label>

              <label htmlFor="state">
                <h5>State:</h5>
                <input htmlFor="state" type="text" onChange={this.handleShippingState} value={this.state.shippingState}/>
              </label>

              <label htmlFor="zip">
                <h5>Zip</h5>
                <input htmlFor="zip" type="tel" onChange={this.handleShippingZip} value={this.state.shippingZip}/>
              </label>
            </div>

            <div>
              <label htmlFor="creditCard" className="checkout">
                <h5>Credit Card:</h5>
                <input htmlFor="creditCard" type="tel" onChange={this.handleCreditCard} value={this.state.creditCard} className="checkout-inputs" minLength="16" maxLength="16"/>
              </label>
            </div>

            <div>
              <label htmlFor="ccmonth">
                <h5>Month:</h5>
                <input htmlFor="ccmonth" type="number" onChange={this.handleExpireMonth} value={this.state.expiremonth}/>
              </label>

              <label htmlFor="ccyear">
                <h5>Year:</h5>
                <input htmlFor="ccyear" type="number" onChange={this.handleExpireYear} value={this.state.expireyear}/>
              </label>

              <label htmlFor="cvv">
                <h5>CVV:</h5>
                <input htmlFor="cvv" type="tel" onChange={this.handleCVV} value={this.state.cvv}/>
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
