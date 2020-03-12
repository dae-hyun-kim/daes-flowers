import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.productViewChoice = this.productViewChoice.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  productViewChoice() {
    if (this.state.view.name === 'catalog') {
      return <ProductList productViewStyle={this.setView} />;
    } else if (this.state.view.name === 'details') {
      return <ProductDetails productView={this.state.view.params} productViewStyle={this.setView} addToCart={this.addToCart}/>;
    } else if (this.state.view.name === 'cart') {
      return <CartSummary cartItemList={this.state.cart} setView={this.setView}/>;
    } else if (this.state.view.name === 'checkout') {
      return <CheckoutForm placeOrder={this.placeOrder} setView={this.setView} cartItemList={this.state.cart}/>;
    }
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => {
        return response.json();
      }).then(result => {
        this.setState({
          cart: result
        });
      });
  }

  addToCart(product) {
    event.preventDefault();
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }).then(response => {
      return (response.json());
    }).then(result => {
      const addItemToCart = this.state.cart.concat(result);
      this.setState({
        cart: addItemToCart
      });
    });
  }

  placeOrder(customerInfo) {
    event.preventDefault();
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerInfo)
    }).then(response => {
      return (response.json());
    }).then(result => {
      this.setState({
        cart: [],
        view: {
          name: 'catalog',
          params: {}
        }
      });
    });
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    return (
      <div className="col-12">
        <div className="header-top d-flex justify-content-center">
          <div className="col-10 mb-3">
            <Header cartItemCount={this.state.cart ? this.state.cart.length : 0} setView={this.setView} cartItemList={this.state.cart}/>
          </div>
        </div>
        <div className="container">
          <div>
            <div>
              {this.productViewChoice()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
