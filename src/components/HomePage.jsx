import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import './homepage.css';
import { UserContext } from '../context/app.context';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { categories, setCategories } = useContext(UserContext);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(`${API_URL}/categories`, {
        withCredentials: true,
      });
      setCategories(response.data);
    };

    getData();
  }, []);

  return (
    <div>
      <div className="title">Box Ideas for the week</div>
      <div>
        <Grid container spacing={2} columns={16}>
          {categories &&
            categories.map((c, i) => {
              return (
                <div className="one-category" key={i}>
                  <Grid item xs={6}>
                    <Item>
                      <div>
                        {c.name}
                        <div>{c.description}</div>
                        <Link to={`/category/${c._id}`}>
                          <button>Check It Out</button>
                        </Link>
                      </div>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <img
                        className="category-image"
                        src={c.image}
                        alt="cat"
                      ></img>
                    </Item>
                  </Grid>
                </div>
              );
            })}
        </Grid>
      </div>
    </div>
  );
};

export default HomePage;
