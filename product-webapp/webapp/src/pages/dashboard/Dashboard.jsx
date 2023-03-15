import React from 'react';
import Header from '../../components/Header';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from "../../themes";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { getSsi } from '../../services/userservices';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [ssi, setssidata] = useState([]);

    useEffect(()=>{
        getSsi().then(data => {
            if (data.status===200){
                setssidata(data.data);
            }
            else{
                alert("Some err....")
            }
        })
    },[]);

      const columns = [
      { field: "ssiRefId", headerName: "ID" },
      {   field: 'view',
          headerName: 'View SSI', 
          flex: 1, 
          renderCell: (params) => {
              return (
                  <Typography>
                  <Link 
                      to={`/ssi/${params.row.ssiRefId}`}
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
                height='70vh'
                width='79vw'
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300]
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
                <DataGrid 
                    rows={ssi}
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
};

export default Dashboard;