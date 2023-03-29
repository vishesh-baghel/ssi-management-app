import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>  
      <Link to="/">
        Sign in
      </Link>
    </Typography>
  );
}


export default function ChangePassword() {
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
              <h1>Change Password</h1> 
               Enter your new password and then sign in with the new password.<br></br><br></br><br></br>
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit}>
               
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                autoComplete="password"
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