import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    if (event.currentTarget === null) {
      return (null);
    } else {
      const changeProductDetailsMethod = this.props.viewProductDetails;
      changeProductDetailsMethod('details', { productId: event.currentTarget.id });
    }
  }

  render() {
    const product = this.props.product;
    return (
      <div id={product.productId} className="card card-dimensions" onClick={this.handleClick}>
        <img src={product.image} className="card-img-top img-styling" alt="..."/>
        <div className="card-body card-font text-center">
          <h5 className="card-title card-product-name">{product.name}</h5>
          <p className="card-text">{product.shortDescription}</p>
        </div>
      </div>
    );
  }
}
