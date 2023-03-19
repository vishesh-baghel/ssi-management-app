import React from 'react';
import Header from '../../components/Header';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from "../../themes";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { getSsi } from '../../services/userservices';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { getUsers } from '../../services/userservices';
import Export from '../../components/Export/Export';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState([]);
    const [modifiedRows, setModifiedRows] = useState(rows);

    useEffect(()=>{
        getSsi().then(data => {
            if (data.status===200){
                setRows(data.data);
                setModifiedRows(data.data);
            }
            else{
                alert("Some err....")
            }
        })
    },[]);


    const clearTextField = (e) => {
        e.target.value = "";
    }
    
      const columns = [
      { field: "ssiRefId", headerName: "ID" },
      {   field: 'view',
          headerName: 'View SSI', 
          flex: 1, 
          renderCell: (params) => {
              return (
                  <Typography>
                  <Link 
                      to={`/dashboard/ssi/${params.row.ssiRefId}`}
                      style={{ textDecoration: 'none', color: colors.greenAccent[500], fontSize: '14px' }}
                  >View
                  </Link>
                  </Typography>
              );
          }},
      { field: 'product', headerName: 'Product', flex: 1, cellClassName: 'name-column--cell' },
      { field: 'currency', headerName: 'Currency', flex: 1 },
      { field: 'assetClass', headerName: 'Asset Class', flex: 1 },
      { field: 'correspondentBankBic', headerName: 'Correspondent', flex: 1 },
      { field: 'beneficiaryBankBic', headerName: 'Beneficiary', flex: 1 },
      { 
          field: 'effectiveDate', 
          headerName: 'Effective Date', 
          flex: 1,
          renderCell: (params) => {
              return (
                  <Typography fontSize='14px'>
                      {params.row.effectiveDate.slice(0, 10)}
                  </Typography>
              );
          }
      },
      { 
          field: 'expiryDate', 
          headerName: 'Expiry Date', 
          flex: 1,
          renderCell: (params) => {
              return (
                  <Typography fontSize='14px'>
                      {params.row.expiryDate.slice(0, 10)}
                  </Typography>
              );
           },
      },
  ];

    return (
        <Box m='20px'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Header title='Dashboard' subtitle='Welcome to your dashboard' />
            </Box>
            <Box 
                height='75vh'
                width='83vw'
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                        animation: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300]
                    },
                    '& .MuiFormLabel-root': {
                        color: colors.grey[100],
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-virtualScrollbar': {
                        backgroundColor: colors.primary[400]
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700],
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${colors.grey[100]} !important`
                    },


                }}
            >
                <Box pb="10px" display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                            <TextField
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
                            />
                            <TextField
                                // style={{ width: 245 }}
                                InputLabelProps={{ shrink: true }}
                                id="search-currency" type="text"
                                onBlur={clearTextField}
                                onChange={(e) => {
                                    setModifiedRows(rows.filter((n) => String(n.userName).toLowerCase().includes(e.target.value.toLowerCase())));
                                }}
                                label="Search Currency"
                                variant="standard"
                                sx={{
                                    paddingRight: "10px"
                                }}
                            />
                            <TextField
                                // style={{ width: 245 }}
                                InputLabelProps={{ shrink: true }}

                                id="search-product" type="text"
                                onBlur={clearTextField}
                                onChange={(e) => {
                                    setModifiedRows(rows.filter((n) => String(n.userEmail).toLowerCase().includes(e.target.value.toLowerCase())));
                                }}
                                label="Search Product"
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
                            />
                        </Box>
                        <Export data={modifiedRows} type='ssi'/>
                    </Box>
                <DataGrid 
                    rows={modifiedRows}
                    rowHeight={40}
                    columns={columns}
                    disableColumnFilter
                    disableColumnSelector
                />
            </Box>
        </Box>
    );
};

export default Dashboard;