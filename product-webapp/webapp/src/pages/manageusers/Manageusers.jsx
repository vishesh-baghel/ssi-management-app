import React from 'react';
import {useNavigate} from 'react-router-dom';

import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../themes";

import Header from '../../components/Header';

const Manageusers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();
    const viewUser = (url)=>{
        navigate(url)
    }

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "userName", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "userEmail", headerName: "Email", flex:1},
        { field: "userCompany", headerName: "Company", flex: 1 },
        { field: "userRole", headerName: "Role", type: "number", headerAlign: "left", align: "left" },
    ]
    return (
        <Box m='20px'>
            <Header title='Manage Users' subtitle='Manage Users Efficiently' />
            <Box m="40px 0 0 0" height="65vh" sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    border: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScrollbar": {
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                }
            }}>
                <DataGrid
                    rows={{}}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    onRowClick={(params)=>{
                        viewUser(`/user/${params.row.id}`)
                    }}
                />
            </Box>
        </Box>
    );
}

export default Manageusers;
