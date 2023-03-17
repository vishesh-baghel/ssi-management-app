import {
    AppBar,
    Typography,
    Box,
    Toolbar,
    Button,
  } from '@mui/material';
  import React from 'react';
  import useScrollTrigger from '@mui/material/useScrollTrigger';
  import PropTypes from 'prop-types';
  import useStyles from '../styles/styles';

  function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  
  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };
  
  const Homepageheader = (props) => {
    const classes = useStyles();
  
    return (
      <Box sx={{ marginBottom: '70px' }}>
        <ElevationScroll {...props}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
                  <Box 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 0,
                            flexDirection: 'row',
                        }}
                    >
                    <img 
                    height='50px'
                    width='50px'
                    src='../../assets/baton-logo-new.png' alt='logo' className={classes.logoImage} />
                    <Typography 
                        variant='h6' 
                        className={classes.logo}
                        sx={{
                            ml: 2,
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            color: 'primary.main',
                        }}
                    >
                      Baton Systems
                    </Typography>
                  </Box>
                <Box>
                <Button 
                    variant='outlined' 
                    color="primary" 
                    className={classes.button}
                    sx={{ marginRight: '10px' }}
                    href='/login'
                >
                    Login
                </Button>
                <Button href='/register' variant="outlined" color="primary" className={classes.button}>
                    Sign up
                </Button>        
                </Box>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </Box>
    );
  };
  
  export default Homepageheader;