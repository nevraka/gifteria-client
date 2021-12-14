import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import './homepage.css';
import { UserContext } from '../context/app.context';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import './products.css';
import { yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const HomePage = () => {
  const [products, setProducts] = useState([]);
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

  const category = categories.find((c) => c._id === categoryId);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    '&:hover': {
      backgroundColor: yellow[700],
    },
    borderRadius: '10px',
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
              <h1 className="name">
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
                  style={{ height: '500px', width: '600px' }}
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
                  <ColorButton>Add to cart</ColorButton>
                </div>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default HomePage;
