import React from 'react';

export default class ProductListItem extends React.Component {

  render() {
    const product = this.props.product;
    return (
      <div className="card card-dimensions">
        <img src={product.image} className="card-img-top img-styling"alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.shortDescription}</p>
        </div>
      </div>
    );
  }
}
