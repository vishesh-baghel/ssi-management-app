/* eslint-disable no-restricted-globals */
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../themes";

import {getUsers, updateUserAdminStatus,removeUser} from "../../services/userservices";

import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
// import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';


import Header from '../../components/Header';

const Manageusers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();
    const viewUser = (url) => {
        navigate(url)
    }
    
    const [rows, setRows] = useState([]);
    
    const updateRows = ()=>{
        getUsers().then(res=>{
            if(res.status===200){
                setRows(res.data)
            }
        })
    }

    const deleteUser = (id) => {
        let flag = confirm("Are you sure to delete")?true:false;
        if(flag){
            removeUser(id).then(res=>{
                if(res.status===200){
                    updateRows()
                    alert("User Deleted.!")
                }
            })
        }
    }

    const toggleAdmin = (id,isAdmin) => {
        updateUserAdminStatus(id,isAdmin).then(res=>{
            if(res.status===200){
                updateRows()
            }
        })
    }

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "userName", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "userEmail", headerName: "Email", flex: 1 },
        { field: "userCompany", headerName: "Company", flex: 1 },
        { field: "userRole", headerName: "Is Admin", type: "boolean", headerAlign: "left", align: "left" },
        {
            field: "actions", type: "actions", align: "center", sortable: false, filterable: false, disableColumnMenu: true,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<PersonIcon/>}
                    label="View"
                    onClick={() => {
                        viewUser(`/manageusers/${params.row.id}`)
                    }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete user"
                    onClick={()=>{deleteUser(params.id)}}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<SecurityIcon />}
                    label="Make user admin"
                    onClick={()=>{toggleAdmin(params.id,params.row.userRole)}}
                    showInMenu
                />,
            ]
        },

    ]

    useEffect(() => {
        updateRows();
    }, []);

    return (
        <Box m='20px'>
            <Header title='Manage Users' subtitle='Manage Users Efficiently' />
            <Box m="40px 0 0 0" height="70vh" width='79vw' sx={{
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
                    rows={rows}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                               quickFilterProps: { debounceMs: 500 },
                         },
                      }}
                />
            </Box>
        </Box>
    );
}

export default Manageusers;
