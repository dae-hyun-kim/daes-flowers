import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const product = this.props.props;
    return (
      <div className="card card-width">
        <img src={product.image} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.shortDescription}</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    );
  }
}
