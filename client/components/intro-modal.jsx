import React from 'react';

export default class IntroModal extends React.Component {
  constructor(props) {
    super(props);
    this.turnOff = this.turnOff.bind(this);
  }

  turnOff(event) {
    event.preventDefault();
    const turnOffMethod = this.props.turnOff;
    turnOffMethod();
  }

  render() {
    return (
      <div className="intro-modal text-center">
        <div className="intro-modal-inner">
          <h1>Welcome</h1>
          <h6 className="mt-4">{'Dae\'s'} Flowers is a Full-Stack E-Commerce Content Management System using React.js and Node.js that was created
        strictly for demonstrational purposes.</h6>
          <h6 className="mt-4">This is not a real E-Commerce Website</h6>
          <h6 className="mt-4">By clicking the accept button below, you accept that no real purchases will be made and there will be no payment processing.
          Actual personal information, such as real names, addresses, and/or credit card numbers should be used at checkout.
          </h6>
          <button className="btn btn-danger mt-3 w-75" onClick={this.turnOff}>Accept</button>
        </div>
      </div>
    );
  }
}
