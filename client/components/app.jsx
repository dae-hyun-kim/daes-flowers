import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.productViewChoice = this.productViewChoice.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      },
      cart: []
    });
  }

  productViewChoice() {
    if (this.state.view.name === 'catalog') {
      return <ProductList productViewStyle={this.setView} />;
    } else if (this.state.view.name === 'details') {
      return <ProductDetails productView={this.state.view.params} productViewStyle={this.setView}/>;
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

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    return (
      <div className="container">
        <div>
          <Header cartItemCount={this.state.cart ? this.state.cart.length : 0}/>
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
