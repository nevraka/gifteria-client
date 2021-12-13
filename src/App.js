import React, { useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import { UserContext } from './context/app.context';

function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate('/signup');
    } else {
      navigate('/cart');
    }
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
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
