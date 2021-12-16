import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import NotFound from './components/NotFound';
import { UserContext } from './context/app.context';
import { API_URL } from './config';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const { user, setUser, setCart } = useContext(UserContext);
  const navigate = useNavigate();
  const [fetchingUser, setFetchingUser] = useState(null);
  const [myError, setMyError] = useState();

  //we make the user requst here to know if the user is logged in or not
  useEffect(() => {
    const getUserData = async () => {
      try {
        setFetchingUser(true);
        let userResponse = await axios.get(`${API_URL}/user`, {
          withCredentials: true,
        });
        setFetchingUser(false);
        setUser(userResponse.data);
      } catch (err) {
        // the request will fail if the user is not logged in
        setFetchingUser(false);
      }
    };
    getUserData();
  }, []);

  const handleAddToCart = async (productId) => {
    if (user) {
      let response = await axios.post(
        `${API_URL}/cart`,
        { productId },
        { withCredentials: true }
      );
      setCart(response.data);
    } else {
      navigate('/signin');
    }
  };

  const handleDelete = async (productId) => {
    if (user) {
      let response = await axios.delete(`${API_URL}/cart`, {
        data: { productId },
        withCredentials: true,
      });
      setCart(response.data);
    } else {
      navigate('/signin');
    }
  };

  const handleEdit = async (productId, quantity) => {
    if (user) {
      let response = await axios.put(
        `${API_URL}/cart`,
        { productId, quantity },
        { withCredentials: true }
      );
      setCart(response.data);
    } else {
      navigate('/signin');
    }
  };

  if (fetchingUser) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/cart"
          element={<Cart handleDelete={handleDelete} handleEdit={handleEdit} />}
        ></Route>
        <Route
          path="/signin"
          element={<SignIn myError={myError} setMyError={setMyError} />}
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route
          path="/category/:categoryId"
          element={<Products handleAddToCart={handleAddToCart} />}
        ></Route>
        <Route
          path="/product/:productId"
          element={<ProductDetails handleAddToCart={handleAddToCart} />}
        ></Route>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
