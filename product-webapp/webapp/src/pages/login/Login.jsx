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

export default function Login() {

  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

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
    setUserName(data.get('name'));
    setUserPassword(data.get('password'));
    console.log({
      userName: data.get('name'),
      password: data.get('password'),
    });
  
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      // setErrMsg("Invalid Entry");
      console.log("Invalid Entry");
    }
  
    try {
      const response = await fetch('http://localhost:8087/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: data.get('name'),
          userPassword: data.get('password')
        }),
      });
  
      const responseData = await response.json();
      console.log('Success:', responseData);
      console.log(responseData.message);
      console.log(responseData.user);
      console.log(responseData.user.roles[0].roleName);
      console.log(responseData.jwtToken);

      const jwtToken = responseData.jwtToken;
      const roles = responseData.user.roles;
      const userName = responseData.user.userName;
      const demo = 'demo';

      localStorage.setItem('token', jwtToken);
      localStorage.setItem('userRole', roles[0].roleName);
      localStorage.setItem('userName', userName);

      setAuth({ demo });

      setMessage(responseData.message);
      setStatus(responseData.status);
      handleAlertOpen();
  
      setSuccess(true);
      setUser('');
      setPwd('');
      setMatchPwd('');
      if (responseData.message !== 'User successfully logged in') {
        console.log('inside if')
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      } else {
        console.log('inside else')
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 2000);
      }
    } catch (err) {
      if (err.response?.status === 500) {
        setErrMsg('No Server Response!');
        console.log(errMsg);
      } else if (!err.response?.status) {
        setErrMsg('Invalid Credentials');
        console.log(errMsg);
      } else {
        setErrMsg('Login Failed')
        console.log(errMsg);
      }
    }
  };

  return (
    <>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      {message === 'User successfully logged in' ? (
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
            <h1>Welcome Back!!</h1> <br></br>
              Don't have an account?
                <Link  href='/register' variant="body2" underline='none'>
                  {<b> Sign up</b>}
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
                name="password"
                label="Password"
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
                Log in 
              </Button>
              <br></br>
              <Box mt='10px'>
                <Link 
                  href="/forgotpassword" 
                  variant="body2"
                  underline='none'
                >
                  <b>
                  Forgot Password?
                  </b>
                </Link>
              </Box>
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
            backgroundImage: 'url(https://img.freepik.com/premium-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg?w=1380)',
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