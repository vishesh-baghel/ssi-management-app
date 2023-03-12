import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../themes';
import { InputBase } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Search } from '@mui/icons-material/Search';
import LightMode from '@mui/icons-material/LightMode';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display='flex' backgroundColor={colors.primary[400]} borderRadius='3px'>
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
                <IconButton type='button' sx={{ p: 1}}></IconButton>
            </Box>
            {/* Icons */}
            <Box display='flex'>
                <IconButton type='button' sx={{ p: 1}} onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                <IconButton type='button' sx={{ p: 1}}>
                    <AccountCircleIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Topbar;