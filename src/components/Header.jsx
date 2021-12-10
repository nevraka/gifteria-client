import React from 'react';
import './header.css';

const Header = () => {
  return (
    <div>
      <nav id="nav">
        <img src="/image/logo.png" height="60px" alt="logo"></img>
        <div className="b-name">Gifteria</div>
        <div>
          <div>Cart</div>
          <div>Login</div>
        </div>
      </nav>
      <hr />
      <hr />
    </div>
  );
};

export default Header;
