import React from 'react';
import ProductListItems from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  getProducts() {
    fetch('/api/products')
      .then(response => {
        return response.json();
      }).then(result => {
        this.setState({
          products: result
        });
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  createProduct() {
    const productList = this.state.products;
    const allProducts = productList.map((product, index) => {
      return (<ProductListItems props={product} key={index}/>);
    });
    return allProducts;
  }

  render() {
    return (
      <div>
        {this.createProduct()}
      </div>
    );
  }
}
