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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      
      <Link href="/">
        Sign in
      </Link>
    </Typography>
  );
}


export default function ForgotPassword() {
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
      <Grid container component="main" spacing={'2.9vw'} sx={{marginLeft:'32vw', marginTop:'10vh', width:'32vw', height: '80vh', border:'2px solid black',borderRadius:'10px'}}>
        <CssBaseline />
        <Grid item xs={12} sm={80} md={5}  elevation={4}>
          <Box
            sx={{
              borderRadius:'2px',
              width:'25vw',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography component="h1" variant="h6">
              <h1>Forgot Password</h1> 
               Enter your email and we'll send a link to reset your password<br></br><br></br><br></br>
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit}>
               
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
            
              <br></br><br></br>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, background:'black',height:'50px', width:'450px',borderRadius:'10px'}}
              >
                Submit
              </Button>
              <br></br>
              
              <Copyright sx={{ mt: 27 }} />
            </Box>
          </Box>
        </Grid>
    </Grid>
   </Box>
  );
}