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
      return <ProductDetails productView={this.state.view.params} productViewStyle={this.setView}/>;
    }
  }

  render() {
    return (
      <div className="container">
        <div>
          <Header/>
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
