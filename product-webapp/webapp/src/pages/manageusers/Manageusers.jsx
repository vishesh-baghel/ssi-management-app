/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, useTheme, TextField, Typography} from '@mui/material';
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../themes";

import { getUsers, updateUserAdminStatus, removeUser } from "../../services/userservices";

import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';

import Header from '../../components/Header';
import Export from '../../components/Export/Export'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Link from '@mui/material/Link';
import { GridToolbar } from '@mui/x-data-grid';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Alert } from '@mui/material';

const Manageusers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const dialogTitle = 'Do you want to make this user admin?';
    const dialogDescription = 'This user will have admin privileges.';
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const viewUser = (url) => {
        navigate(url)
    }

    const [rows, setRows] = useState([]);
    const [modifiedRows, setModifiedRows] = useState(rows);

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

    const updateRows = async () => {
        const response = await fetch('http://localhost:8086/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          companyName: "baton systems",
          offset: pageState.page,
          count: pageState.pageSize,
          sortBy: "email",
          orderBy: "asc"
        }),
        });
  
        const responseData = await response.json();
        console.log('Success:', responseData);
        setRows(responseData.results);
        setModifiedRows(responseData.results);
    }

    
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
            // handleClickOpen();
            // updateUserAdminStatus(id, isAdmin).then(res => {
            //     if (res.status === 200) {
            //         updateRows()
            //     }
            // }) 
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
    }
    )
    // const json = await response.json()
    // console.log("admin role: ", json)
    // fetchData();
    // if (json.status === 200) {
    //     alert("User updated successfully")
    // }
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
                // <GridActionsCellItem
                //     icon={<PersonIcon />}
                //     label="View"
                //     onClick={() => {
                //         viewUser(`/profile/${params.row.id}`)
                //     }}
                //     showInMenu
                //     />,
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

    // useEffect(() => {
    //     updateRows();
    // }, []);
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
                            {/* <TextField
                                // style={{ width: 110 }}
                                InputLabelProps={{ shrink: true }}
                                id="search-id" type="number"
                                onBlur={clearTextField}
                                onChange={(e) => {
                                    setModifiedRows(rows.filter((n) => String(n.id).toLowerCase().includes(e.target.value.toLowerCase())));
                                }}
                                label="Search Id"
                                variant="standard"
                                sx={{
                                    paddingRight: "10px"
                                }}
                            /> */}
                            <TextField
                                // style={{ width: 245 }}
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
                            {/* <TextField
                                // style={{ width: 245 }}
                                InputLabelProps={{ shrink: true }}

                                id="search-email" type="text"
                                onBlur={clearTextField}
                                onChange={(e) => {
                                    setModifiedRows(rows.filter((n) => String(n.userEmail).toLowerCase().includes(e.target.value.toLowerCase())));
                                }}
                                label="Search Email"
                                variant="standard"
                                sx={{
                                    paddingRight: "10px"
                                }}
                            />
                            <TextField
                                // style={{ width: 245 }}
                                InputLabelProps={{ shrink: true }}

                                id="search-company" type="text"
                                onBlur={clearTextField}
                                onChange={(e) => {
                                    setModifiedRows(rows.filter((n) => String(n.userCompany).toLowerCase().includes(e.target.value.toLowerCase())));
                                }}
                                label="Search Company"
                                variant="standard"
                            /> */}
                        </Box>
                        {/* <Export modifiedRows/>
                         */}
                            <Button 
                            sx = {{
                                color: `${colors.grey[100]} !important`,
                                marginTop: "50px"
                            }}
                            onClick={() => { window.open(exportLink) }}>
                                Export to csv: <FileDownloadOutlinedIcon />
                            </Button>
                         </Box>
                    {/* <DataGrid
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
                        /> */}
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
                                // showQuickFilter: true,
                                // quickFilterProps: { debounceMs: 500 },
                                csvOptions: { disableToolbarButton: true },
                                printOptions: { disableToolbarButton: true },
                             },
                          }}
                        />
                </Box>
            </Box>
        </Box>
        {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
            "& .MuiDialog-paper": {
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
            },
            "& .MuiDialog-paper .MuiDialogTitle-root": {
                fontSize: "1.5rem",
            },
            "& .MuiDialog-paper .MuiDialogContent-root": {
                fontSize: "1.5rem",
            },
            "& .MuiDialog-paper .MuiDialogActions-root .MuiButton-text": {
                color: colors.grey[100],
                fontSize: "1.2rem",
            },
            "& .MuiDialog-paper .MuiDialogActions-root .MuiButton-text.Mui-disabled": {
                color: colors.grey[100],
            },
            "& .MuiDialog-paper .MuiDialogActions-root .MuiButton-text:hover": {
                color: colors.grey[100],
            },

        }}
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> */}
        </>
    );
}

export default Manageusers;
