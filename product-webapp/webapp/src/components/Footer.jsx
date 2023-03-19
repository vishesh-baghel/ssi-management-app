import React from 'react';
import { Box, Typography } from '@mui/material';
import useStyles from '../styles/styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.footerContainer}>
      <Typography className={classes.footerDate}>Built by Group 2</Typography>
    </Box>
  );
};

export default Footer;