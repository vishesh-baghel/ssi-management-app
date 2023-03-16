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
import { fontSize } from '@mui/system';
import {Formik} from "formik";
import * as yup from "yup";


export default function Login() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };


const handleFormSubmit=(values,actions)=>{
  console.log(values)
}

const initialValues={
  userEmail:"",
  userPassword:""
};

const userSchema=yup.object().shape({
  userEmail:yup.string().email().required("required"),
  userPassword:yup.string().required("required")
})

  return (
    <Box>
      <Grid container component="main" spacing={'4vw'} sx={{ margin: '10vh', width: '80vw', height: '80vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            borderRadius: '3vh',
            backgroundImage: 'url(https://img.freepik.com/premium-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg?w=1380)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={80} md={5} elevation={6}>
          <Box
            sx={{
              borderRadius: '2px',
              width: '40vw',
              display: 'flex',
              flexDirection: 'column',
              // border:'2px solid black'
            }}
          >
            <Typography component="h1" variant="h6">
              <h1 align='center'>WELCOME</h1>
              <h3 align='center'>Sign in</h3>
            </Typography>

            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={userSchema}>

              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (

                <form onSubmit={handleSubmit}>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{}}>
                    <TextField
                      margin="normal"
                      type="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.userEmail}
                      error={!!touched.userEmail&&!!errors.userEmail}
                      helperText={touched.userEmail && errors.userEmail}
                      required
                      fullWidth
                      id="userEmail"
                      label="Email Address"
                      name="userEmail"
                      // autoComplete="email"
                      // autoFocus
                    />
                    <br></br>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="userPassword"
                      label="Password"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.userPassword}
                      error={!!touched.userPassword&&!!errors.userPassword}
                      helperText={touched.userPassword && errors.userPassword}
                      id="userPassword"
                      // autoComplete="current-password"
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ marginLeft: '10vw', marginTop: '5vh', background: 'black', height: '47px', width: '400px', borderRadius: '10px' }}
                    >
                      Sign In
                    </Button>

                    <br></br>


                    <Grid container align='left' sx={{ marginTop: '4vh' }}>
                      <Grid item xs>
                        <Link href="/forgotpassword" >
                          {"Forgot password?"}
                        </Link>
                      </Grid>

                      <Grid item>
                        <Link href="/signin" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>


                  </Box>
                </form>

              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}