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

export default function ChangePassword() {

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handlePassword = async () => {
    const response = await fetch('http://localhost:8080/user/savePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
        token: localStorage.getItem('resetToken')
      })
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
      if (data.status === 200) {
        setMessage(data.message);
        handleOpen();
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      }
    });
  }

  return (
    <Box>
      <Snackbar 
      open={open} 
      autoHideDuration={6000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
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
            <Typography component="h1" variant="h6" mb='60px'>
              <h1>Change Password</h1> 
               Enter a new password to change the previous password for your account
            </Typography>
            <Box>
              <TextField
                margin="normal"
                required
                fullWidth
                type={'password'}
                id="password"
                label="Old Password"
                name="password"
                autoComplete="password"
                onChange={(e) => setOldPassword(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type={'password'}
                id="password"
                label="New Password"
                name="password"
                autoComplete="password"
                onChange={(e) => setNewPassword(e.target.value)}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handlePassword}
                sx={{ mt: 3, mb: 2 }}
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