/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, useTheme, TextField, Typography} from '@mui/material';
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import Header from '../../components/Header';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { GridToolbar } from '@mui/x-data-grid';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

const Manageusers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const [pageState, setPageState] = useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 1,
        pageSize: 10
    })   
    
    const [exportLink, setExportLink] = useState("")
    const [companyNameFilter, setCompanyNameFilter] = useState("")

    const clearTextField = (e) => {
        e.target.value = "";
    }

  const handleAlertOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
    
    const deleteUser = async (email) => {
        let flag = confirm("Are you sure to delete") ? true : false;
        if (flag) {
            console.log(email)
            const response = await fetch('http://localhost:8086/user/delete', {
               method: 'DELETE',
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            email: email,
        }),
    }).then(res => {
        return res.json()
    }).then(data => {
        if (data.status === 200) {
            fetchData();
            alert("User deleted successfully")
        }
    }).catch(() => {
        setMessage("You are not authorized to perform this action")
        handleAlertOpen();
    })
    }}

    const toggleAdmin = async (email, isAdmin) => {
            console.log(isAdmin)
            const response = await fetch('http://localhost:8086/user', {
               method: 'PATCH',
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            email: email,
            isAdmin: !isAdmin 
        }),
    }).then(res => {
        return res.json()
    }).then(data => {
        if (data.status === 200) {
            fetchData();
            alert("User role updated successfully")
        }     
    }).catch(() => {
        setMessage("You are not authorized to perform this action")
        handleAlertOpen();
    })
}
    
    const columns = [
        { field: "id", headerName: "ID" },
        { field: "userName", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "companyName", headerName: "Company", flex: 1 },
        { field: "admin", headerName: "Is Admin", type: "boolean", headerAlign: "left", align: "left" },
        {
            field: "actions", type: "actions", align: "center", sortable: false, filterable: false, disableColumnMenu: true,
            getActions: (params) => [
                    <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete user"
                    onClick={() => { deleteUser(params.row.email) }}
                    showInMenu
                    />,
                <GridActionsCellItem
                    icon={<SecurityIcon />}
                    label="Make user admin"
                    onClick={() => { toggleAdmin(params.row.email, params.row.admin) }}
                    showInMenu
                    />,
                ]
        },
        
    ]
    const fetchData = async () => {
      setPageState(old => ({ ...old, isLoading: true }))
      const response = await fetch('http://localhost:8086/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
          offset: pageState.page,
          count: pageState.pageSize,
          sortBy: "email",
          orderBy: "asc"
        }),
    });
      const json = await response.json()
      console.log(json)
      setExportLink(json.exportLink)
      setPageState(old => ({ ...old, isLoading: false, data: json.results, total: json.total }))
    }

    useEffect(() => {
        fetchData()
      }, [pageState.page, pageState.pageSize])
    

    const handleSearch = async (e) => {
        const response = await fetch(`http://localhost:8086/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            offset: pageState.page,
            count: pageState.pageSize,
            companyName: companyNameFilter,
            sortBy: "email",
            orderBy: "asc"
        }),
    });
    const json = await response.json();
    setPageState(old => ({ ...old, isLoading: false, data: json.results, total: json.total }))
    }

    return (
        <>
        <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                {message}
            </Alert>
    </Snackbar>
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
                "& .MuiFormLabel-root":{
                    color: `${colors.grey[100]} !important`
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
                    <Box pb="10px" display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Box>
                            <Button 
                            sx = {{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                marginBottom: "10px",
                            }}
                            onClick={() => {
                                handleSearch();
                            }}>
                                Filter
                            </Button>
                            </Box>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                id="search-name" type="text"
                                onBlur={clearTextField}
                                onChange={(e) => {setCompanyNameFilter(e.target.value)}}
                                label="Filter by Company"
                                variant="standard"
                                sx={{
                                    paddingRight: "10px"
                                }}
                            />
                        </Box>
                            <Button 
                            sx = {{
                                color: `${colors.grey[100]} !important`,
                                marginTop: "50px"
                            }}
                            onClick={() => { window.open(exportLink) }}>
                                Export to csv: <FileDownloadOutlinedIcon />
                            </Button>
                         </Box>
                        <DataGrid
                           height={600}
                           rows={pageState.data}
                           rowCount={pageState.total}
                           loading={pageState.isLoading}
                           rowsPerPageOptions={[10, 30, 50]}
                           pagination
                           page={pageState.page - 1}
                           pageSize={pageState.pageSize}
                           paginationMode='server'
                           onPageChange={(newPage) => {
                             setPageState(old => ({ ...old, page: newPage + 1 }))
                           }}
                           onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
                           columns={columns}
                           components={{ Toolbar: GridToolbar }}
                           disableColumnFilter
                           disableColumnMenu
                           disableDensitySelector
                           disableColumnSelector
                           componentsProps={{
                            toolbar: {
                                csvOptions: { disableToolbarButton: true },
                                printOptions: { disableToolbarButton: true },
                             },
                          }}
                        />
                </Box>
            </Box>
        </Box>
        </>
    );
}

export default Manageusers;
