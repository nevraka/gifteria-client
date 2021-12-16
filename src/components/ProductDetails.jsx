import { useState, useEffect } from 'react';
import { API_URL } from '../config';
import { useParams } from 'react-router-dom';
import './productdetails.css';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';

const ProductDetails = ({ handleAddToCart }) => {
  const [productDetail, setProductDetail] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(`${API_URL}/products/${productId}`, {
        withCredentials: true,
      });
      setProductDetail(response.data);
    };

    getData();
  }, [productId]);

  if (!productDetail) {
    return <CircularProgress color="secondary" />;
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    fontWeight: '600',
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
    borderRadius: '10px',
    padding: '10px',
    marginTop: '10px',
  }));

  return (
    <div>
      <Link
        to={`/category/${productDetail.category && productDetail.category._id}`}
        style={{ textDecoration: 'none' }}
      >
        <strong className="category-name">
          <img src="/image/arrow.png" alt="arr" className="arrow" />
          {productDetail.category && productDetail.category.name}
        </strong>
      </Link>
      <h1 className="title">{productDetail.name}</h1>
      <div>
        <div className="home">
          <img
            className="category-image"
            src={productDetail.image}
            alt="cat"
            style={{ height: '400px', width: '600px' }}
          ></img>
          <div className="detai-price">{productDetail.description}</div>
          <div className="detai-price">Price : ${productDetail.price}</div>
          <ColorButton onClick={() => handleAddToCart(productId)}>
            Add to cart
          </ColorButton>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
