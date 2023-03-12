import React from 'react';
import Header from '../../components/Header';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import { mockDataTeam } from "../../data/mockData";

const Manageusers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
    ]
    return (
        <Box m='20px'>
            {/* <Box display='flex' justifyContent='space-between' alignItems='center'> */}
            <Header title='Manage users' subtitle='Manage your team efficiently' />
            <Box m="40px 0 0 0" height="65vh" sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
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
                    rows={mockDataTeam}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            {/* </Box> */}
        </Box>
    );
}

export default Manageusers;
