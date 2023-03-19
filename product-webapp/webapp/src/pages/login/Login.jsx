import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Formik } from "formik";
import * as React from 'react';
import * as yup from "yup";

export default function Login() {

  const handleFormSubmit = (values, actions) => {
    console.log("values");
  };


  const initialValues = {
    validateOnMount: true,
    userEmail: "",
    userPassword: ""
  };

  const userSchema = yup.object({
    userEmail: yup.string().email().required("required"),
    userPassword: yup.string().required("required")
  })
  return (


    <Box>

      <Box p="2rem 0 0 2rem">
        <img src="https://alsop-louie.com/wp-content/uploads/2017/03/baton-logo-crop.png" height={'40vh'} width={'180vw'} />
      </Box>

      <Grid container className="loginBody" component="main" spacing={'4vw'} sx={{ margin: '0vh', width: '100vw', height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            borderRadius: '3vh',
            backgroundImage: 'url(https://img.freepik.com/premium-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg?w=1380)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '75vh',
            width: '40vw',
            marginTop: '3vh'
          }}
        />

        <Grid item xs={12} sm={80} md={6} elevation={5}>
          <Box
            sx={{
              borderRadius: '2px',
              width: '40vw',
              flexDirection: 'column',
              marginTop: '10px',
              height: '60vh',
              marginTop: '50px'
            }}
          >
            <Typography component="h1" variant="h6">
              <h1 align='center'>WELCOME</h1>
              <h3 align='center'>SIGN IN</h3>
            </Typography>

            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={userSchema}>

              { 
              
            formik  => { console.log(formik);
                 return ( 

                <form onSubmit={formik.handleSubmit}>
                  <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{}}>
                    <TextField
                      margin="normal"
                      type="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.userEmail}
                      error={!!formik.touched.userEmail && !!formik .errors.userEmail}
                      helperText={formik.touched.userEmail && formik.errors.userEmail}
                      required
                      fullWidth
                      id="userEmail"
                      label="Email Address"
                      name="userEmail"
                    />
                    <br></br>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="userPassword"
                      label="Password"
                      type="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.userPassword}
                      error={!!formik.touched.userPassword && !!formik.errors.userPassword}
                      helperText={formik.touched.userPassword && formik.errors.userPassword}
                      id="userPassword"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled= {!(formik.isValid && formik.dirty)} 
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
                        <Link href="/register" variant="body2">
                          {"Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </form>
              ) }}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}