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
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleEmail = async () => {
    console.log(email);
    const response = await fetch('http://3.108.1.80:8080/user/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        email: email
      })
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
      if (data.message !== 'User not found') {
        localStorage.setItem('resetToken', data.message);
        setSuccess(true);
        setMessage("Email sent for password reset instructions");
        handleOpen();
        setTimeout(() => {
          navigate('/changepassword', { replace: true });
        }, 2000);
      } else {
        console.log("error");
        setMessage("User not found");
        handleOpen();
      }
    });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
        {success ? (<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
          </Alert>)
        }
      </Snackbar>
      <Grid container spacing={'2.9vw'} sx={{ marginTop:'10vh', width:'32vw', height: '80vh', border:'2px solid black',borderRadius:'10px'}}>
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
            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            
              <br></br><br></br>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleEmail}
                >
                Submit
              </Button>
              <br></br>
            </Box>
          </Box>
        </Grid>
    </Grid>
   </Box>
  );
}