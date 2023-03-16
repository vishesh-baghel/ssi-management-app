import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box>
      <Grid container component="main" spacing={'2vw'} sx={{margin:'10vh', width:'90vw', height: '80vh'}}>
        <CssBaseline />
        
        <Grid item xs={12} sm={80} md={5}  elevation={6}>
          <Box
            sx={{
              borderRadius:'2px',
              width:'35vw',
              display: 'flex',
              flexDirection: 'column',

            }}
          >
            
          <Grid item>
            <h1>Get Started</h1> <br></br>
              Already have an account? 
                <Link  href='/' variant="body2">
                  {<b>Sign in</b>}
                </Link>
                <br></br><br></br>
          </Grid>

           
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ }}>
               <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                autoComplete="current-password"
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                align='center'
                sx={{ mt: 6, mb: 1, background:'black',height:'50px', width:'400px',borderRadius:'10px',marginLeft:'30px'}}
              >
                Sign Up
              </Button>
              <br></br>
            </Box>

          </Box>
        </Grid>


        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            borderRadius:'3vh',
            backgroundImage: 'url(https://img.freepik.com/free-vector/demand-insurance-service-digital-insurer-mobile-app-innovative-business-model-female-customer-ordering-insurance-policy-online_335657-2536.jpg?w=826&t=st=1678907071~exp=1678907671~hmac=1120b4e75f45441005734459a2d8b7a4e044dc719b7c761bb1b3660472521994 )',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>


      </Box>
  );
}