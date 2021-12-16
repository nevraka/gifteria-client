import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import './homepage.css';
import { UserContext } from '../context/app.context';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import './products.css';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const Products = ({ handleAddToCart }) => {
  const [products, setProducts] = useState(null);
  const { categories } = useContext(UserContext);
  const { categoryId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const url = categoryId ? `products?category=${categoryId}` : 'products';
      let response = await axios.get(`${API_URL}/${url}`, {
        withCredentials: true,
      });
      setProducts(response.data);
    };

    getData();
  }, [categoryId]);

  if (!products) {
    return <CircularProgress color="secondary" />;
  }

  const category = categories.find((c) => c._id === categoryId);

  const ColorButton = styled(Button)(({ theme }) => ({
    fontWeight: '600',
    backgroundColor: orange[500],
    color: 'white',
    '&:hover': {
      backgroundColor: orange[700],
    },
    borderRadius: '10px',
    padding: '10px',
    marginTop: '10px',
  }));
  return (
    <div>
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <strong className="category-name">
          <img src="/image/arrow.png" alt="arr" className="arrow" />
          Home Page
        </strong>
      </Link>
      <h1 className="title">Our Products</h1>
      <Grid container spacing={2}>
        {category && (
          <>
            <Grid item xs={6}>
              <h1 className="pname">
                {category.name}
                <div className="desc">{category.description}</div>
              </h1>
            </Grid>
            <Grid item xs={6}>
              <div>
                <img
                  className="category-image"
                  src={category.image}
                  alt="cat"
                  style={{ height: '400px', width: '700px' }}
                ></img>
              </div>
            </Grid>
          </>
        )}
      </Grid>
      <Grid container spacing={2}>
        {products &&
          products.map((p) => {
            return (
              <Grid item xs={12} md={6} lg={4} className="section">
                <div className="each-product">
                  <img className="category-image" src={p.image} alt="cat"></img>
                  <Link
                    to={`/product/${p._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <h3 style={{ cursor: 'pointer' }}>{p.name}</h3>
                  </Link>
                  <div>{p.description}</div>
                  <div>Price : ${p.price}</div>
                  <ColorButton onClick={() => handleAddToCart(p._id)}>
                    Add to cart
                  </ColorButton>
                </div>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Products;
