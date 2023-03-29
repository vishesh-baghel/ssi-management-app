import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import AuthContext from '../../context/AuthProvider';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Register() {

  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  
  const [validPwd, setValidPwd] = useState(false);
  const [matchPwd, setMatchPwd] = useState('');
  const [pwd, setPwd] = useState('');
  
  const [validMatch, setValidMatch] = useState(false);
  
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleAlertOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("global state: ", localStorage.getItem('token'));
    console.log({
      userName: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      companyName: data.get('company')
    });

    localStorage.setItem('userName', data.get('name'));
    localStorage.setItem('userRole', 'user');

    sessionStorage.setItem('userName', data.get('name'));
    sessionStorage.setItem('userRole', 'user');
  
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      console.log("Invalid Entry");
    }
  
    try {
      const response = await fetch('http://localhost:8086/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: data.get('name'),
          password: data.get('password'),
          email: data.get('email'),
          companyName: data.get('company'),
          role: "user"
        }),
      });
  
      const responseData = await response.json();
      console.log('Success:', responseData);
      console.log(responseData.message);
      setMessage(responseData.message);
      setStatus(responseData.status);
      handleAlertOpen();
  
      setSuccess(true);
      setUser('');
      setPwd('');
      setMatchPwd('');
      if (responseData.message !== 'User registered successfully') {
        console.log('inside if')
        setTimeout(() => {
          navigate('/register', { replace: true });
        }, 2000);
      } else {
        console.log('inside else')
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
        console.log(errMsg);
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
        console.log(errMsg);
      } else {
        setErrMsg('Registration Failed')
        console.log(errMsg);
      }
    }
  };

  return (
    <>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      {message === 'User registered successfully' ? (
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      ) : (
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      )}
    </Snackbar>
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
                <Link  onClick={()=>navigate('/login')} variant="body2" underline='none'>
                  {<b> Sign in</b>}
                </Link>
                <br></br><br></br>
          </Grid>
           {errMsg && <Alert severity="error">{errMsg}</Alert>}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ }}>
               <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="User Name"
                name="name"
                autoComplete="name"
                />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                />
              <TextField
                margin="normal"
                required
                fullWidth
                id="company"
                label="Company Name"
                name="company"
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
                sx={{ mt: 6, mb: 1,height:'50px', width:'400px',borderRadius:'10px'}}
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
      </>
  );
}