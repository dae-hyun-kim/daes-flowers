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
      },
      checkbox: null
    };
    this.handleName = this.handleName.bind(this);
    this.handleCreditCard = this.handleCreditCard.bind(this);
    this.handleShippingAddress = this.handleShippingAddress.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.changeView = this.changeView.bind(this);
    this.priceTotal = this.priceTotal.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handleShippingCity = this.handleShippingCity.bind(this);
    this.handleShippingState = this.handleShippingState.bind(this);
    this.handleShippingZip = this.handleShippingZip.bind(this);
    this.handleExpireMonth = this.handleExpireMonth.bind(this);
    this.handleExpireYear = this.handleExpireYear.bind(this);
    this.handleCVV = this.handleCVV.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
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
    const numRegex = RegExp(/^[0-9]*$/);
    if (numRegex.test(event.currentTarget.value) === false) {
      return null;
    } else {
      this.setState({
        phonenumber: event.currentTarget.value
      });
    }
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
    const numRegex = RegExp(/^[0-9]*$/);
    if (numRegex.test(event.currentTarget.value) === false) {
      return null;
    } else {
      this.setState({
        shippingZip: event.currentTarget.value
      });
    }
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
    const numRegex = RegExp(/^[0-9]*$/);
    if (numRegex.test(event.currentTarget.value) === false) {
      return null;
    } else {
      this.setState({
        cvv: event.currentTarget.value
      });
    }
  }

  handleCheckBox(event) {
    if (this.state.checkbox === false) {
      this.setState({
        checkbox: true
      });
    } else {
      this.setState({
        checkbox: false
      });
    }
  }

  handlePlaceOrder(event) {
    event.preventDefault();
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const validationCheck = this.state.formValidation;
    if (this.state.name.length > 65 || this.state.name.length < 5) {
      validationCheck.name = false;
      this.setState({
        formValidation: validationCheck
      });
    } else {
      validationCheck.name = true;
      this.setState({
        formValidation: validationCheck
      });
    }

    if (emailRegex.test(this.state.email) === false) {
      validationCheck.email = false;
      this.setState({
        formValidation: validationCheck
      });
    } else {
      validationCheck.email = true;
    }

    if (this.state.phonenumber.length !== 10) {
      validationCheck.phonenumber = false;
      this.setState({
        formValidation: validationCheck
      });
    } else {
      validationCheck.phonenumber = true;
    }

    if (this.state.shippingAddress.length < 5) {
      validationCheck.shippingAddress = false;
      this.setState({
        formValidation: validationCheck
      });
    } else {
      validationCheck.shippingAddress = true;
    }

    if (this.state.shippingCity.length < 3 || this.state.shippingCity.length > 50) {
      validationCheck.shippingCity = false;
      this.setState({
        formValidation: validationCheck
      });
    } else {
      validationCheck.shippingCity = true;
    }

    if (!this.state.shippingState) {
      validationCheck.shippingState = false;
      this.setState({
        formValidation: validationCheck
      });
    } else {
      validationCheck.shippingState = true;
    }

    if (this.state.shippingZip.length !== 5) {
      validationCheck.shippingZip = false;
      this.setState({
        formValidation: validationCheck
      });
    } else {
      validationCheck.shippingZip = true;
    }

    if (this.state.creditCard.length < 16) {
      validationCheck.creditCard = false;
      this.setState({
        formValidation: validationCheck
      });
    } else {
      validationCheck.creditCard = true;
    }

    if (!this.state.expiremonth) {
      validationCheck.expiremonth = false;
      this.setState({
        formValidation: validationCheck
      });
    } else {
      validationCheck.expiremonth = true;
    }

    if (!this.state.expireyear) {
      validationCheck.expireyear = false;
      this.setState({
        formValidation: validationCheck
      });
    } else {
      validationCheck.expireyear = true;
    }

    if (this.state.cvv.length < 3 || this.state.cvv.length > 4) {
      validationCheck.cvv = false;
      this.setState({
        formValidation: validationCheck
      });
    } else {
      validationCheck.cvv = true;
    }

    if (this.state.formValidation.name === false ||
        this.state.formValidation.email === false ||
        this.state.formValidation.phonenumber === false ||
        this.state.formValidation.shippingAddress === false ||
        this.state.formValidation.shippingCity === false ||
        this.state.formValidation.shippingState === false ||
        this.state.formValidation.shippingZip === false ||
        this.state.formValidation.creditCard === false ||
        this.state.formValidation.expiremonth === false ||
        this.state.formValidation.expireyear === false ||
        this.state.formValidation.cvv === false ||
        this.state.checkbox === false ||
        this.state.checkbox === null) {
      if (this.state.checkbox === null) {
        this.setState({
          checkbox: false
        });
      } else {
        return null;
      }
    } else {
      const placeOrderMethod = this.props.placeOrder;
      this.setState({
        formValidation: validationCheck
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
          <div className="hello">
            <div>
              <h1 className="font-styling checkout-heading mb-4">Checkout</h1>
              <h3 className="final-order-total">{`Order Total: $${this.priceTotal()}`}</h3>
            </div>
            <form>

              <div>
                <label htmlFor="name" className="checkout">
                  <h5>Full Name:</h5>
                  <input htmlFor="name" type="text" onChange={this.handleName} value={this.state.name} className="checkout-inputs form-inputs w-100" minLength="5" maxLength="65"/>
                  {this.state.formValidation.name === false ? <p className="form-error">Please Enter Full Name - Must be at least 5 letters</p> : null}
                </label>
              </div>

              <div className="d-flex justify-content-between flex-wrap">
                <label htmlFor="email" className="email-input">
                  <h5>Email:</h5>
                  <input htmlFor="email" type="email" onChange={this.handleEmail} value={this.state.email} minLength="6" maxLength="254" className="checkout-inputs form-inputs w-100"/>
                  {this.state.formValidation.email === false ? <p className="form-error">Please Enter a Valid Email</p> : null}
                </label>

                <label htmlFor="phone">
                  <h5>Phone Number:</h5>
                  <input htmlFor="phone" type="tel" onChange={this.handlePhoneNumber} value={this.state.phonenumber} minLength="10" maxLength="10" className="checkout-inputs form-inputs w-100"/>
                  {this.state.formValidation.phonenumber === false ? <p className="form-error">Please Enter a Valid Phone Number</p> : null}
                </label>
              </div>

              <div>
                <label htmlFor="address" className="checkout">
                  <h5>Shipping Address:</h5>
                  <textarea htmlFor="shippingAddress" name="address" id="address" onChange={this.handleShippingAddress} value={this.state.shippingAddress} className="checkout-inputs form-inputs w-100"></textarea>
                </label>
                {this.state.formValidation.shippingAddress === false ? <p className="form-error">Please Enter a Valid Shipping Address</p> : null}
              </div>

              <div className="d-flex justify-content-between flex-wrap">
                <label htmlFor="city" className="city-input">
                  <h5>City:</h5>
                  <input htmlFor="city" type="text" onChange={this.handleShippingCity} value={this.state.shippingCity} minLength="3" maxLength="50" className="checkout-inputs form-inputs w-100"/>
                  {this.state.formValidation.shippingCity === false ? <p className="form-error">Please Enter a Valid City</p> : null}
                </label>

                <label htmlFor="state" className="state-label">
                  <h5>State:</h5>
                  <select htmlFor="state" type="text" onChange={this.handleShippingState} value={this.state.shippingState} className="checkout-inputs form-inputs">
                    <option defaultValue hidden></option>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AZ">AZ</option>
                    <option value="AR">AR</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DE">DE</option>
                    <option value="DC">DC</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="IA">IA</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="ME">ME</option>
                    <option value="MD">MD</option>
                    <option value="MA">MA</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MS">MS</option>
                    <option value="MO">MO</option>
                    <option value="MT">MT</option>
                    <option value="NE">NE</option>
                    <option value="NV">NV</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NY">NY</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WV">WV</option>
                    <option value="WI">WI</option>
                    <option value="WY">WY</option>
                  </select>
                  {this.state.formValidation.shippingState === false ? <p className="form-error">Please Select a State</p> : null}
                </label>

                <label htmlFor="zip" className="zip-input">
                  <h5>Zip</h5>
                  <input htmlFor="zip" type="tel" onChange={this.handleShippingZip} value={this.state.shippingZip} minLength="5" maxLength="5" className="checkout-inputs form-inputs w-100"/>
                  {this.state.formValidation.shippingZip === false ? <p className="form-error">Please Enter a Valid Zip Code</p> : null}
                </label>
              </div>

              <div>
                <label htmlFor="creditCard" className="checkout">
                  <h5>Credit Card:</h5>
                  <input htmlFor="creditCard" type="tel" onChange={this.handleCreditCard} value={this.state.creditCard} className="checkout-inputs form-inputs w-100" minLength="16" maxLength="16"/>
                  {this.state.formValidation.creditCard === false ? <p className="form-error">Please Enter a Valid Credit Card Number</p> : null}
                </label>
              </div>

              <div className="d-flex justify-content-between flex-wrap">
                <label htmlFor="ccmonth">
                  <h5>Month:</h5>
                  <select htmlFor="ccmonth" type="number" onChange={this.handleExpireMonth} value={this.state.expiremonth} className="checkout-inputs form-inputs">
                    <option defaultValue hidden></option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  {this.state.formValidation.expiremonth === false ? <p className="form-error">Invalid Expiration Month</p> : null}
                </label>

                <label htmlFor="ccyear">
                  <h5>Year:</h5>
                  <select htmlFor="ccyear" type="number" onChange={this.handleExpireYear} value={this.state.expireyear} className="checkout-inputs form-inputs ">
                    <option defaultValue hidden></option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                  {this.state.formValidation.expireyear === false ? <p className="form-error">Invalid Expiration Year</p> : null}
                </label>

                <label htmlFor="cvv" className="cvv-input">
                  <h5>CVV:</h5>
                  <input htmlFor="cvv" type="tel" onChange={this.handleCVV} value={this.state.cvv} minLength="3" maxLength="4" className="checkout-inputs form-inputs w-100"/>
                  {this.state.formValidation.cvv === false ? <p className="form-error">Invalid CVV</p> : null}
                </label>
              </div>
              <div className="mt-2">
                <label htmlFor="checkbox">
                  <div><input type="checkbox" className="mr-1" onClick={this.handleCheckBox}/>I accept that this website is for demonstration purposes only and no real purchases will be made. No real personal information should
                  be used in the submission of this form.</div>
                  {this.state.checkbox === false ? <p className="form-error">Terms are required for checkout</p> : null}
                </label>
              </div>

              <div className="d-flex justify-content-between mt-4 place-order-container">
                <button className="btn btn-pink continue-shopping-size mt-2 mb-2" onClick={this.changeView}>Continue Shopping</button>
                <button onClick={this.handlePlaceOrder} className="btn btn-success mt-2 mb-2">Place Order</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
