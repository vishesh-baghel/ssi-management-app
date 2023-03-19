import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../themes';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* Icons */}
            <Box sx= {{
                display: 'flex',
                alignItems: 'center',
                mt: 0,
            }}>
                <img src="../../assets/baton-logo-new.png" alt="logo" width="30" height="30" />
                <Typography variant='h2' sx={{ 
                    ml: 1, color: colors.grey[100],
                }}>
                    Baton Adminis
                </Typography>
            </Box>
            <Box display='flex'>
                <AppBar 
                    position="static"
                    color='transparent'
                    sx={{
                        boxShadow: 'none',
                    }}
                >
                    <Toolbar>
                {auth && (
                    <div>
                <IconButton type='button' sx={{ p: 1.4}} onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                <IconButton 
                    type='button' 
                    sx={{ p: 1.4}}
                    onClick={handleMenu}
                    color="inherit"
                    >
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                sx = {{
                    '& .MuiPaper-root': {
                        backgroundColor: colors.primary[400],
                        color: colors.grey[100],
                    },
                    mt: 6,
                }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={handleClose}>
                    <AccountBoxIcon />
                    <Link to='/dashboard/profile' style={{ 
                        textDecoration: 'none',
                        color: colors.grey[100],
                        paddingLeft: '10px',
                    }}>
                     Account
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <LogoutIcon />
                    <Link to='/' style={{ 
                        textDecoration: 'none', 
                        color: colors.grey[100],
                        paddingLeft: '10px',
                    }}>
                        Logout
                    </Link>
                </MenuItem>
                </Menu>
                </div>
                )}
                </Toolbar>
            </AppBar>
            </Box>
        </Box>
    );
}

export default Topbar;