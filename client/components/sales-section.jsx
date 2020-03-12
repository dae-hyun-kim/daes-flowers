import React from 'react';

export default class SalesSection extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="sales-section text-center">
          <h2 className="sales-section-title">Create your Own Unique Bouquet</h2>
          <div className="d-flex justify-content-center">
            <ol>
              <li className="sales-section-instructions">Pick your Flowers</li>
              <li className="sales-section-instructions">Pick a Container</li>
              <li className="sales-section-instructions">Design your Layout</li>
              <li className="sales-section-instructions">Schedule your Delivery</li>
              <li className="sales-section-instructions">We will take care of the rest!</li>
            </ol>
          </div>
        </div>
        <div className="col-12 short-divider"></div>
        <div className="sales-section text-center mt-4">
          <h2 className="sales-section-title">Our Most Popular <span className="flower-text">Flowers</span><span className="stem-text">---</span></h2>
        </div>
      </div>
    );
  }
}
