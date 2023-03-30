import React from 'react';
import { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    TextField,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { Formik } from 'formik';
import { getUserbyId } from '../../services/userservices';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../themes';
import Header from '../../components/Header';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { HomeOutlinedIcon } from '@mui/icons-material/HomeOutlined';

export const Viewprofile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [userData, setuserData] = useState([]);

    const data = localStorage.getItem('userObj');
    const userObj = JSON.parse(data);

    return (
        <Box
        >
        <Box
            sx={{
                margin: 'auto',
                padding: 4,
            }}
        >
            <Header title="User details" subtitle="All your profile details are here"/>
            <Table
            >
                <TableBody>
                    <TableRow>
                        <TableCell 
                            style = {{
                                borderBottom: 'none',
                            }}
                        >
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h6"
                                fontWeight={700}
                            >
                                User Name
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body1"
                            >
                                {userObj.userName}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell
                        style = {{
                            borderBottom: 'none',
                        }}
                        >
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h6"
                                fontWeight={700}
                            >
                               User Email
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body1"
                            >
                                {userObj.email}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell
                            style = {{
                                borderBottom: 'none',
                            }}
                        >
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h6"
                                fontWeight={700}
                            >
                                User Role
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body1"
                                >
                                {localStorage.getItem('userRole')}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell
                            style = {{
                                borderBottom: 'none',
                            }}
                        >
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h6"
                                fontWeight={700}
                                >
                                Role Description
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body1"
                                >
                                {localStorage.getItem('roleDescription')}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    </TableBody>
            </Table>
        </Box>
    </Box>
    )
}
export default Viewprofile;