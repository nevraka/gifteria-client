import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import './homepage.css';
import { UserContext } from '../context/app.context';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import './products.css';

const HomePage = () => {
  const { products, setProducts } = useContext(UserContext);
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

  return (
    <div>
      <div className="title">Our Ideas</div>
      <div className="container">
        <Grid container spacing={1}>
          {products &&
            products.map((p) => {
              return (
                <Grid container item spacing={3}>
                  <div className="each_product">
                    <img
                      className="category-image"
                      src={p.image}
                      alt="cat"
                    ></img>
                    <Link to={`/product/${p._id}`}>
                      <div style={{ cursor: 'pointer' }}>{p.name}</div>
                    </Link>
                    <div>{p.description}</div>
                    <div>${p.price}</div>
                    <button>Add to cart</button>
                  </div>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
};

export default HomePage;
