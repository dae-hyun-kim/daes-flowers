import React from 'react';

export default class IntroModal extends React.Component {
  render() {
    return (
      <div className="intro-modal text-center">
        <h2>Welcome</h2>
        <h6>{'Dae\'s'} Flowers is a Full-Stack E-Commerce Content Management System using React.js and Node.js that was created
        strictly for demonstrational purposes.</h6>
        <h6>This is not a real E-Commerce Website</h6>
        <h6>By clicking the accept button below, you accept that no real purchases will be made and there will be no payment processing.
          Actual personal information, such as real names, addresses, and/or credit card numbers should be used at checkout.
        </h6>
      </div>
    );
  }
}
