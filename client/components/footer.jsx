import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <div className="col-12 footer-divider"></div>
        <div className="footer mt-2 d-flex justify-content-around">
          <div className="mt-4 footer-info">
            <h5 className="footer-titles">Location:</h5>
            <p>1234 Lorem Ave 100 Street</p>
            <p>Lorem Ipsum, California</p>
            <p>10101</p>
          </div>
          <div className="mt-4 footer-info">
            <h5 className="footer-titles">About Us:</h5>
            <p>Our Story</p>
          </div>
          <div className="mt-4 footer-info">
            <h5 className="footer-titles">Follow Us</h5>
            <i className="fab fa-instagram fa-2x social-media m-2"></i>
            <i className="fab fa-facebook-square fa-2x social-media m-2"></i>
            <i className="fab fa-twitter-square fa-2x social-media m-2"></i>
            <i className="fab fa-youtube-square fa-2x social-media m-2"></i>
          </div>
        </div>
      </div>
    );
  }
}
