import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.item ? this.props.item.quantity : '',
      update: false,
      remove: false
    };
    this.removeFromCart = this.removeFromCart.bind(this);
    this.decrementHandler = this.decrementHandler.bind(this);
    this.incrementHandler = this.incrementHandler.bind(this);
    this.showRemoveModal = this.showRemoveModal.bind(this);
    this.removeItemFromCartModal = this.removeItemFromCartModal.bind(this);
    this.hideRemoveModal = this.hideRemoveModal.bind(this);
  }

  removeFromCart(event) {
    const cartItemId = event.currentTarget.id;
    const removeCartItemMethod = this.props.removeFromCart;
    this.setState({
      remove: false
    });
    removeCartItemMethod(cartItemId);
  }

  incrementHandler(event) {
    event.preventDefault();
    const cartItemId = event.currentTarget.id;
    let originalQuantity = this.state.quantity;
    const newQuantity = {
      quantity: this.state.quantity + 1,
      newTotalPrice: (this.state.quantity + 1) * this.props.item.price
    };
    this.setState({
      quantity: ++originalQuantity,
      update: true
    });
    fetch(`/api/cart/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuantity)
    });
  }

  decrementHandler(event) {
    event.preventDefault();
    if (this.state.quantity > 1) {
      const cartItemId = event.currentTarget.id;
      let originalQuantity = this.state.quantity;
      const newQuantity = {
        quantity: this.state.quantity - 1,
        newTotalPrice: (this.state.quantity - 1) * this.props.item.price
      };
      this.setState({
        quantity: --originalQuantity,
        update: true
      });
      fetch(`/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuantity)
      });
    }
  }

  showRemoveModal(event) {
    event.preventDefault();
    this.setState({
      remove: true
    });
  }

  hideRemoveModal(event) {
    event.preventDefault();
    this.setState({
      remove: false
    });
  }

  removeItemFromCartModal() {
    const theItem = this.props.item;
    if (this.state.remove === true) {
      return (
        <div className="confirm-remove-modal">
          <div className="continue-shopping-modal-inner text-center">
            <div className="mt-2">
              <h3>Are You Sure?</h3>
            </div>
            <div className="mt-3">
              <h5>Do you want to remove this from your cart?</h5>
              <h5>Item: {theItem.name}</h5>
              <h5>Qty: {this.state.quantity}</h5>
            </div>
            <div className="d-flex justify-content-around mt-4">
              <button onClick={this.hideRemoveModal} className="btn btn-pink keep-in-cart">Keep in cart</button>
              <button onClick={this.removeFromCart} id={this.props.item.cartItemId} className="btn btn-danger font-styling btn-sm remove">Remove</button>
            </div>
          </div>
        </div>
      );
    }
  }

  componentDidUpdate() {
    if (this.state.update === true) {
      this.setState({
        update: false
      });
      const getCartMethod = this.props.getCart;
      getCartMethod();
    }
  }

  render() {
    const theItem = this.props.item;
    const priceReformat = (theItem.totalprice / 100).toFixed(2);
    return (
      <div className="d-flex justify-content-around cart-item-container col-10 cart-item-border">
        {this.removeItemFromCartModal()}
        <div className="col-5 cart-summary-image-container">
          <img src={theItem.image} alt="" className="cart-summary-img-styling"/>
        </div>
        <div className="d-flex align-items-center">
          <div className="col-12 text-center">
            <h2 className="font-styling flower-name">{theItem.name}</h2>
            <h3 className="font-styling">{`$${priceReformat}`}</h3>
            <p className="flower-info-text">{theItem.shortDescription}</p>
            <div className="d-flex justify-content-around mt-5">
              <div className="d-flex justify-content-center">
                <div className="d-flex align-items-center justify-content-center quantity-changer" id={this.props.item.cartItemId} onClick={this.decrementHandler}>
                  <i className="fas fa-minus"></i>
                </div>
                <input type="number" className="text-center quantity-input" readOnly value={this.state.quantity}/>
                <div className="d-flex align-items-center justify-content-center quantity-changer" id={this.props.item.cartItemId} onClick={this.incrementHandler}>
                  <i className="fas fa-plus"></i>
                </div>
              </div>
              <button onClick={this.showRemoveModal} className="btn btn-danger btn-sm font-styling remove">Remove</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
