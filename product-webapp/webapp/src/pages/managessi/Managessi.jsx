import React from 'react';
import Header from '../../components/Header';
import { Box } from '@mui/material';

const Managessi = () => {
    return (
        <Box m='20px'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Header title='Manage SSIs' subtitle='Manage your settlement instructions' />
            </Box>
            
        </Box>
    );
}

export default Managessi;