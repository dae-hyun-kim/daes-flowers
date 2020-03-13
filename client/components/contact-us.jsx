import React from 'react';

export default class ContactUs extends React.Component {
  render() {
    return (
      <div className="container mt-4">
        <div className="col-12 text-center font-styling">
          <h1 className="about-title">Contact Us</h1>
          <h2>{'We\'re Here to Help'}</h2>
          <p className="contact-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse,
            praesentium laborum in nemo rerum nam aperiam cum officiis quae nisi.</p>
        </div>
        <div className="d-flex justify-content-around mt-4 contact-us">
          <div className="text-center">
            <i className="far fa-clock fa-9x"></i>
            <h3 className="mt-4">Store Hours:</h3>
            <h5>Monday-Friday</h5>
            <h5>7AM - 5PM</h5>
          </div>
          <div className="text-center">
            <i className="fas fa-phone fa-9x"></i>
            <h3 className="mt-4">Phone Number:</h3>
            <h5>123-456-7890</h5>
          </div>
          <div className="text-center">
            <i className="far fa-envelope fa-9x"></i>
            <h3 className="mt-4">Email:</h3>
            <h5>Thisisnotreal@gmail.com</h5>
          </div>
        </div>
      </div>
    );
  }
}
