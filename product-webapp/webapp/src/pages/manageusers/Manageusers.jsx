/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, useTheme, TextField, IconButton } from '@mui/material';
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../themes";

import { getUsers, updateUserAdminStatus, removeUser } from "../../services/userservices";

import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
// import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
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
    const [modifiedRows, setModifiedRows] = useState(rows);


    const updateRows = () => {
        getUsers().then(res => {
            if (res.status === 200) {
                setRows(res.data)
                setModifiedRows(res.data)
            }
        })
    }

    const deleteUser = (id) => {
        let flag = confirm("Are you sure to delete") ? true : false;
        if (flag) {
            removeUser(id).then(res => {
                if (res.status === 200) {
                    updateRows()
                    alert("User Deleted.!")
                }
            })
        }
    }

    const toggleAdmin = (id, isAdmin) => {
        updateUserAdminStatus(id, isAdmin).then(res => {
            if (res.status === 200) {
                updateRows()
            }
        })
    }

    const clearTextField = (e) => {
        e.target.value = "";
    }

    const exportCsv = () => {
        const csvString = [
            [
                "id",
                "userName",
                "userEmail",
                "userCompany",
                "userRole"
            ],
            ...modifiedRows.map(item => [
                item.id,
                item.userName,
                item.userEmail,
                item.userCompany,
                item.userRole
            ])
        ].map(e => e.join(",")).join("\n");
        const csv_data = `${csvString}`.split("\n").join('\n');

        let CSVFile = new Blob([csv_data], { type: "text/csv" });
        var temp_link = document.createElement('a');
        temp_link.download = document.title;
        var url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);
        temp_link.click();
        document.body.removeChild(temp_link);
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
                    icon={<PersonIcon />}
                    label="View"
                    onClick={() => {
                        viewUser(`/manageusers/${params.row.id}`)
                    }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete user"
                    onClick={() => { deleteUser(params.id) }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<SecurityIcon />}
                    label="Make user admin"
                    onClick={() => { toggleAdmin(params.id, params.row.userRole) }}
                    showInMenu
                />,
            ]
        },

    ]

    useEffect(() => {
        updateRows();
    }, []);

    return (
        <Box m='0 20px'>
            <Header title='Manage Users' subtitle='Manage Users Efficiently' />
            <Box m="10px 0 0 0" height="60vh" sx={{
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
                },
                '& input[type=number]': {
                    '-moz-appearance': 'textfield'
                },
                '& input[type=number]::-webkit-outer-spin-button': {
                    '-webkit-appearance': 'none',
                    margin: 0
                },
                '& input[type=number]::-webkit-inner-spin-button': {
                    '-webkit-appearance': 'none',
                    margin: 0
                }
            }}>
                <Box height="60vh">
                    <Box p="0 0 2px 0" display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                            <TextField
                                // style={{ width: 110 }}
                                InputLabelProps={{shrink:true}}
                                id="search-id" type="number"
                                onBlur={clearTextField}
                                onChange={(e) => {
                                    setModifiedRows(rows.filter((n) => String(n.id).toLowerCase().includes(e.target.value.toLowerCase())));
                                }}
                                label="Search Id"
                                variant="standard"
                            />
                            <TextField
                                // style={{ width: 245 }}
                                InputLabelProps={{shrink:true}}
                                id="search-name" type="text"
                                onBlur={clearTextField}
                                onChange={(e) => {
                                    setModifiedRows(rows.filter((n) => String(n.userName).toLowerCase().includes(e.target.value.toLowerCase())));
                                }}
                                label="Search Name"
                                variant="standard"
                            />
                            <TextField
                                // style={{ width: 245 }}
                                InputLabelProps={{shrink:true}}

                                id="search-email" type="text"
                                onBlur={clearTextField}
                                onChange={(e) => {
                                    setModifiedRows(rows.filter((n) => String(n.userEmail).toLowerCase().includes(e.target.value.toLowerCase())));
                                }}
                                label="Search Email"
                                variant="standard"
                            />
                            <TextField
                                // style={{ width: 245 }}
                                InputLabelProps={{shrink:true}}

                                id="search-company" type="text"
                                onBlur={clearTextField}
                                onChange={(e) => {
                                    setModifiedRows(rows.filter((n) => String(n.userCompany).toLowerCase().includes(e.target.value.toLowerCase())));
                                }}
                                label="Search Company"
                                variant="standard"
                            />
                        </Box>
                        <Box>
                            <IconButton onClick={exportCsv}><DownloadIcon /></IconButton>
                        </Box>
                    </Box>
                    <DataGrid
                        rows={modifiedRows}
                        rowHeight={40}
                        columns={columns}
                        disableColumnFilter
                        disableColumnSelector
                    // components={{ Toolbar: GridToolbar }}
                    // componentsProps={{
                    //     toolbar: {
                    //         showQuickFilter: true,
                    //            quickFilterProps: { debounceMs: 500 },
                    //      },
                    //   }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default Manageusers;
