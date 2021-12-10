import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer-lay">
      <hr />
      <hr />
      <div className="ab-img">
        <img src="/image/logo.png" height="60px" alt="logo"></img>
        <div className="about-us">
          About Us
          <div>
            Gifteria is your go-to for gifting. You can create personalized and
            custom gift boxes or choose from a prepacked box for friends and
            family.
          </div>
        </div>
      </div>
      <div className="madeby">
        Made by&nbsp;
        <Link to="https://www.linkedin.com/in/nevrakaya/">Nevra</Link>
      </div>
    </div>
  );
};
export default Footer;
