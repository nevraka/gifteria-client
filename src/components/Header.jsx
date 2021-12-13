import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <div>
      <nav id="nav">
        <Link to="/">
          <img src="/image/logo.png" height="60px" alt="logo" />
        </Link>
        <div className="b-name">Gifteria</div>
        <div>
          <div>
            <Link style={{ textDecoration: 'none' }} to="/cart">
              Cart
            </Link>
          </div>
          <div>
            <Link style={{ textDecoration: 'none' }} to="/signin">
              Login
            </Link>
          </div>
        </div>
      </nav>
      <hr />
      <hr />
    </div>
  );
};

export default Header;
