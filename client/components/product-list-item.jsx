import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div className="card card-width">
        <img src="..." className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">Card Title</h5>
          <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, possimus.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    );
  }
}
