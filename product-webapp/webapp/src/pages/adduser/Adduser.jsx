import React from 'react';
import Header from '../../components/Header';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Adduser = () => {
    return (
        <Box m='20px'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Header title='Add Users' subtitle='Add your team members' />
            </Box>
        </Box>
    );
}

export default Adduser;