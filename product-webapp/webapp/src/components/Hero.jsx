import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
// import myteam from '../images/myteam.jpg';
import useStyles from '../styles/styles';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            Let's scale your business
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Increase your team's productivity with Baton and get more done in less time.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', height:'50px', fontSize: '16px' }}
            onClick={()=>navigate("/register")}
          >
            Get Started
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src="../../assets/3d-plastic-people-boy-with-books.png" alt="My Team" className={classes.largeImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;