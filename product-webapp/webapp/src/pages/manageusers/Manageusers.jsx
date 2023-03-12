import React from 'react';
import Header from '../../components/Header';
import { Box } from '@mui/material';

const Manageusers = () => {
    return (
        <Box m='20px'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Header title='Manage users' subtitle='Manage your team efficiently' />
            </Box>
        </Box>
    );
}

export default Manageusers;