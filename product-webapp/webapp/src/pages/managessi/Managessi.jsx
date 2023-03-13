import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { Box, Switch, ToggleButton, Typography} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {Button} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { tokens } from '../../themes';
import { getSsi } from '../../services/userservices';

const Managessi = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ssi, setssidata] = React.useState([]);

  useEffect(()=>{
    getSsi().then(data => {
      if (data.status===200){
        setssidata(data.data);
      }
      else{
        alert("Some err....")
      }
    })
  },[])
  const columns = [
    { field: 'ssiRefId', headerName: 'SSI ID', flex: 1},
    {
        field: "Remove SSI",
        flex: 1,
        renderCell: (params) => {
          return (
            <Typography>
            <Link 
                to={`/ssi/${params.row.id}`}
                style={{ textDecoration: 'none', color: colors.greenAccent[500], fontSize: '14px' }}
            >Remove
            </Link>
            </Typography>
          );
        },
      },
      {
        field: "edit",
        headerName: "Edit SSI",
        flex: 1,
        renderCell: (params) => {
          return (
            <Typography>
            <Link 
                to={`/ssi/${params.row.id}`}
                style={{ textDecoration: 'none', color: colors.greenAccent[500], fontSize: '14px' }}
            >Edit SSI
            </Link>
            </Typography>
          );
        },
      },
      {
        field: "view",
        flex: 1,
        headerName: "View SSI",
        renderCell: (params) => {
          return (
            <Typography>
            <Link 
                to={`/ssi/${params.row.id}`}
                style={{ textDecoration: 'none', color: colors.greenAccent[500], fontSize: '14px' }}
            >View
            </Link>
            </Typography>
          );
        },
      },
      {
        field: "makeprimary",
        flex: 1,
        headerName: "Make Primary",
        renderCell: (params) => {
          return (
            <Box color={colors.greenAccent[500]}>
              <Switch />
            </Box>
          );
        },
      },
  ];
    return (
        <Box m='20px'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Header title='Manage SSIs' subtitle='Manage your settlement instructions' />
            </Box>
            <Box 
                height='70vh'
                width='80vw'
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
        },}}>
                <DataGrid
                    rows={ssi}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
        
    );
}

export default Managessi;