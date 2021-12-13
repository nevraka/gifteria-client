import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-lay">
      <hr />
      <hr />
      <div className="ab-img">
        <Link to="/">
          <img src="/image/logo.png" height="60px" alt="logo" />
        </Link>

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
        <a href="https://www.linkedin.com/in/nevrakaya/" target="_blank rel=''">
          Nevra
        </a>
      </div>
    </div>
  );
};
export default Footer;
