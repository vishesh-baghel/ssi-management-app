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
      <Grid container className="loginBody" component="main" spacing={'4vw'} sx={{ margin: '0vh', width: '100vw', height: '100vh' }}>
        <CssBaseline />
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
              <h1 align='left'>Welcome Back!!</h1>
              <h3 align='left'>Log in</h3>
            </Typography>

            <Box>
              Don't have an account? <Link href="/register" variant="body2"> <b>Sign Up</b></Link>
            </Box>

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
                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled= {!(formik.isValid && formik.dirty)} 
                      sx={{ 
                        marginTop: '5vh', 
                        height: '47px', 
                        width: '400px', 
                        borderRadius: '10px', 
                      }}
                      >
                      Sign In
                    </Button>
                  </Box>
                    <br></br>
                    <Grid container align='left' sx={{ marginTop: '4vh' }}>
                      <Grid item xs>
                        <Link href="/forgotpassword" >
                          {"Forgot password?"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </form>
              ) }}
            </Formik>
          </Box>
        </Grid>
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
      </Grid>
    </Box>
  );
}