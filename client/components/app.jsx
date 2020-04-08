import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Carousel from './carousel';
import SalesSection from './sales-section';
import AboutUs from './about-us';
import ContactUs from './contact-us';
import Footer from './footer';

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
    this.carouselView = this.carouselView.bind(this);
    this.salesSectionView = this.salesSectionView.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.footerView = this.footerView.bind(this);
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
      return (
        <div>
          <ProductList productViewStyle={this.setView} />
          <div className="col-12 short-divider mb-3"></div>
          <div>
            <h2 className="text-center sales-section-title font-styling mt-3">A Completely Unique Bouquet, Designed By You!</h2>
            <h6 className="text-center mt-3 mb-5 flower-quote">{`"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis doloribus quia velit minus
              expedita optio alias corrupti aliquam amet vel"`}</h6>
          </div>
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return <ProductDetails productView={this.state.view.params} productViewStyle={this.setView} addToCart={this.addToCart}/>;
    } else if (this.state.view.name === 'cart') {
      return <CartSummary cartItemList={this.state.cart} setView={this.setView} removeFromCart={this.removeFromCart}/>;
    } else if (this.state.view.name === 'checkout') {
      return <CheckoutForm placeOrder={this.placeOrder} setView={this.setView} cartItemList={this.state.cart}/>;
    } else if (this.state.view.name === 'aboutUs') {
      return <AboutUs />;
    } else if (this.state.view.name === 'contactUs') {
      return <ContactUs/>;
    }
  }

  footerView() {
    if (this.state.view.name === 'catalog' || this.state.view.name === 'cart' || this.state.view.name === 'details' || this.state.view.name === 'checkout') {
      return (
        <Footer setView={this.setView}/>
      );
    } else {
      return (
        null
      );
    }
  }

  carouselView() {
    if (this.state.view.name === 'catalog') {
      return (
        <div className="carousel-container">
          <Carousel />
        </div>
      );
    }
  }

  salesSectionView() {
    if (this.state.view.name === 'catalog') {
      return (
        <SalesSection/>
      );
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

  removeFromCart(cartItemId) {
    const findIndexFunction = currentId => currentId.cartItemId === parseInt(cartItemId);
    const theIndex = this.state.cart.findIndex(findIndexFunction);
    fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE'
    })
      .then(response => {
        return response;
      })
      .then(result => {
        const newCart = this.state.cart.slice();
        newCart.splice(theIndex, 1);
        this.setState({
          cart: newCart
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
      <div className="col-12 all">
        <div className="header-top d-flex justify-content-center">
          <div className="col-12 mb-3">
            <Header cartItemCount={this.state.cart ? this.state.cart.length : 0} setView={this.setView} cartItemList={this.state.cart}/>
          </div>
        </div>
        <div className="col-12 header-divider"></div>
        {this.carouselView()}
        {this.salesSectionView()}
        <div className="container">
          <div>
            <div>
              {this.productViewChoice()}
            </div>
          </div>
        </div>
        {this.footerView()}
      </div>
    );
  }
}
