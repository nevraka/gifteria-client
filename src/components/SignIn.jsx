import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { API_URL } from '../config';
import { UserContext } from '../context/app.context';

const theme = createTheme();

const SignIn = ({ setMyError }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      let newUser = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      let response = await axios.post(`${API_URL}/signin`, newUser, {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (err) {
      console.log(err.response);
      setMyError(err.response.data.error);
    }
  };

  navigate('/');
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignIn}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              // autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              // autoComplete="current-password"
              // helperText={myError ? myError : ''}
              // error={myError ? true : false}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: 'black' }}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
