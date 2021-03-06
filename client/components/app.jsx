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
import IntroModal from './intro-modal';
import ThankYouPage from './thank-you-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: [],
      cartQuantity: '',
      introModal: true,
      dim: true
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
    this.turnOffIntroModal = this.turnOffIntroModal.bind(this);
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
      return <ProductDetails productView={this.state.view.params} productViewStyle={this.setView} addToCart={this.addToCart} setView={this.setView}/>;
    } else if (this.state.view.name === 'cart') {
      return <CartSummary cartItemList={this.state.cart} setView={this.setView} removeFromCart={this.removeFromCart} getCart={this.getCartItems}/>;
    } else if (this.state.view.name === 'checkout') {
      return <CheckoutForm placeOrder={this.placeOrder} setView={this.setView} cartItemList={this.state.cart}/>;
    } else if (this.state.view.name === 'aboutUs') {
      return <AboutUs />;
    } else if (this.state.view.name === 'contactUs') {
      return <ContactUs/>;
    } else if (this.state.view.name === 'thank-you') {
      return <ThankYouPage setView={this.setView}/>;
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
        const totalQuantity = result.reduce((prev, cur) => {
          return prev + cur.quantity;
        }, 0);
        this.setState({
          cart: result,
          cartQuantity: totalQuantity
        });
      });
  }

  addToCart(product, quantity) {
    event.preventDefault();
    const productQuantity = {
      quantity: quantity
    };
    let duplicate = false;
    const cart = this.state.cart;
    const theProductId = product.productId;
    const theProductWithQuantity = { ...product, ...productQuantity };
    let duplicateQuantity = null;
    let newTotalPrice = null;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId === theProductId) {
        duplicate = true;
        duplicateQuantity = cart[i].quantity + quantity;
        const additonalTotal = product.price * quantity;
        newTotalPrice = cart[i].totalprice + additonalTotal;
        const duplicateProduct = {
          productId: theProductId,
          newQuantity: duplicateQuantity,
          newTotalPrice: newTotalPrice
        };
        fetch('/api/cart', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(duplicateProduct)
        }).then(response => {
          return (response.json());
        }).then(result => {
          cart[i] = { ...cart[i], ...result };
          const oldQuantity = this.state.cartQuantity;
          this.setState({
            cart,
            cartQuantity: this.state.cartQuantity - oldQuantity + result.quantity,
            dim: false
          });
        });
      }
    }

    if (duplicate === false) {
      fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(theProductWithQuantity)
      }).then(response => {
        return (response.json());
      }).then(result => {
        const addItemToCart = this.state.cart.concat(result);
        this.setState({
          cart: addItemToCart,
          cartQuantity: this.state.cartQuantity + result.quantity
        });
      });
    }
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
        const totalQuantity = newCart.reduce((prev, cur) => {
          return prev + cur.quantity;
        }, 0);
        this.setState({
          cart: newCart,
          cartQuantity: totalQuantity,
          dim: false
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
          name: 'thank-you',
          params: {}
        },
        cartQuantity: ''
      });
    });
  }

  turnOffIntroModal() {
    this.setState({
      introModal: false,
      dim: false
    });
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    return (
      <div>
        {this.state.introModal === true ? <IntroModal turnOff={this.turnOffIntroModal}/> : null}
        <div className={this.state.dim === true ? 'dim' : null}>
          <div className="col-12 all">
            <div className="header-top d-flex justify-content-center">
              <div className="col-12 mb-3">
                <Header cartItemCount={this.state.cart ? this.state.cartQuantity : 0} setView={this.setView} cartItemList={this.state.cart}/>
              </div>
            </div>
            <div className="col-12 header-divider"></div>
            <div>
              {this.carouselView()}
            </div>
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
        </div>
      </div>
    );
  }
}
