import React from 'react';

export default class AboutUs extends React.Component {
  render() {
    return (
      <div className="container mt-4">
        <div className="col-12 d-flex justify-content-center font-styling">
          <h1 className="about-title">{'About Dae\'s Flowers'}</h1>
        </div>
        <div className="d-flex justify-content-around mt-4 flex-wrap">
          <div className="about-us-image col-5 about-us-image-container">
            <img src="images/about-us.jpg" alt="" className="about-us-image-sizing"/>
          </div>
          <div className="col-5 about-us-text">
            <h3 className="font-styling">Our Story</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit aut qui enim veniam provident illum
              tenetur repudiandae recusandae odit suscipit?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil perferendis sunt quisquam autem, est fugiat?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae ipsam quaerat voluptatem praesentium quas amet accusamus illum illo
              sdolores magni facere, neque, totam est ad laboriosam doloremque inventore nihil. Voluptatum.</p>
          </div>
        </div>
        <div className="d-flex justify-content-around mt-4 flex-wrap">
          <div className="col-5 about-us-text">
            <h3 className="font-styling">Our Goal</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit aut qui enim veniam provident illum
              tenetur repudiandae recusandae odit suscipit?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil perferendis sunt quisquam autem, est fugiat?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae ipsam quaerat voluptatem praesentium quas amet accusamus illum illo
              sdolores magni facere, neque, totam est ad laboriosam doloremque inventore nihil. Voluptatum.</p>
          </div>
          <div className="about-us-image col-5 about-us-image-container">
            <img src="images/about-us-2.jpg" alt="" className="about-us-image-sizing" />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <div className="col-3">
            <div className="d-flex justify-content-around">
              <i className="fab fa-instagram fa-2x social-media"></i>
              <i className="fab fa-facebook-square fa-2x social-media"></i>
              <i className="fab fa-twitter-square fa-2x social-media"></i>
              <i className="fab fa-youtube-square fa-2x social-media"></i>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-around mt-4">
          <h1 className="font-styling mb-4 thank-you">Thank You For Choosing Us!</h1>
        </div>
      </div>
    );
  }
}
