import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

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
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application.json'
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
      <div className="container">
        <div>
          <Header cartItemCount={this.state.cart ? this.state.cart.length : 0} setView={this.setView}/>
        </div>
        <div>
          <div>
            {this.productViewChoice()}
          </div>
        </div>
      </div>
    );
  }
}
