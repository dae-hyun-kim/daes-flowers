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
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <div>
          <Header/>
        </div>
        <div>
          <div>
            <ProductList productViewStyle={this.setView} />
            <ProductDetails />
          </div>
        </div>
      </div>
    );
  }
}
