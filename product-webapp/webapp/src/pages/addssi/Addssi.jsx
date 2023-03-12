import React from 'react';
import Header from '../../components/Header';
import { Box } from '@mui/material';

const Addssi = () => {
    return (
        <Box m='20px'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Header title='Add SSIs' subtitle='Add standard settlement instructions' />
            </Box>
        </Box>
    );
}

export default Addssi;