import React, { useContext } from 'react';
import './header.css';
import { UserContext } from '../context/app.context';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(`${API_URL}/signout`, {}, { withCredentials: true });
    setUser(null);
    navigate('/');
  };

  return (
    <div>
      <nav id="nav">
        <Link to="/">
          <img src="/image/logo.png" height="60px" alt="logo" />
        </Link>
        <div className="b-name">Gifteria</div>
        <div>
          <div>
            <Link
              style={{ textDecoration: 'none', paddingRight: '10px' }}
              to="/cart"
            >
              {user ? `${user.name}'s Cart` : 'Cart'}
            </Link>
          </div>
          {user ? (
            <Link style={{ textDecoration: 'none' }} to="/">
              <div
                onClick={handleLogout}
                variant="text"
                style={{ padding: '0' }}
              >
                Logout
              </div>
            </Link>
          ) : (
            <>
              <div>
                <Link style={{ textDecoration: 'none' }} to="/signin">
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>
      <hr />
      <hr />
    </div>
  );
};

export default Header;
