import React, { useContext } from 'react';
import './homepage.css';
import { UserContext } from '../context/app.context';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const HomePage = () => {
  const { categories } = useContext(UserContext);

  const ColorButton = styled(Button)(({ theme }) => ({
    fontWeight: '600',
    backgroundColor: green[500],
    color: 'white',
    '&:hover': {
      backgroundColor: green[700],
    },
    padding: '10px',
    marginTop: '10px',
  }));
  return (
    <div style={{ padding: 20 }}>
      <h1 className="title">Gift Ideas for the week</h1>
      <Grid container spacing={2}>
        {categories &&
          categories.map((c, i) => {
            return (
              <>
                <Grid item xs={6} order={i % 2 === 0 ? i * 2 : i * 2 + 1}>
                  <div className="name">{c.name}</div>
                  <div className="desc">{c.description}</div>
                  <Link
                    to={`/category/${c._id}`}
                    style={{ textDecorationLine: 'none' }}
                  >
                    <ColorButton>Check It Out</ColorButton>
                  </Link>
                </Grid>
                <Grid item xs={6} order={i % 2 === 0 ? i * 2 + 1 : i * 2}>
                  <div>
                    <img
                      className="category-image"
                      src={c.image}
                      alt="cat"
                    ></img>
                  </div>
                </Grid>
              </>
            );
          })}
      </Grid>
    </div>
  );
};

export default HomePage;
