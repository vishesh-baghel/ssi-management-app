import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { Box, Switch, Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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
    { field: 'ssiRefId', headerName: 'SSI ID', headerAlign: 'center', align: 'center',width:120},
    {
        field: "remove",
        width:180,
        align: "center",
        headerName: "REMOVE SSI",
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <Typography>
            <Link 
                to={`/ssi/${params.row.id}`}
                style={{ textDecoration: 'none', color: colors.greenAccent[500], fontSize: '14px' }}
            >REMOVE
            </Link>
            </Typography>
          );
        },
      },
      {
        field: "edit",
        width:180,
        align: "center",
        headerName: "EDIT SSI",
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <Typography>
            <Link 
                to={`/ssi/${params.row.id}`}
                style={{ textDecoration: 'none', color: colors.greenAccent[500], fontSize: '14px' }}
            >EDIT
            </Link>
            </Typography>
          );
        },
      },
      {
        field: "view",
        width:180,
        align: "center",
        headerName: "VIEW SSI",
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <Typography>
            <Link 
                to={`/ssi/${params.row.id}`}
                style={{ textDecoration: 'none', color: colors.greenAccent[500], fontSize: '14px' }}
            >VIEW
            </Link>
            </Typography>
          );
        },
      },
      {
        field: "makeprimary",
        width:160,
        align: "center",
        headerAlign: "center",
        headerName: "Make Primary",
        renderCell: (cellValues) => {
          return (
            <Switch></Switch>
          );
        },
      },
  ];

  // const rows = [
  //   { id: 1},
  //   { id: 2},
  //   { id: 3},
  //   { id: 4},
  //   { id: 5},
  //   { id: 6},
  //   { id: 7},
  //   { id: 8},
  //   { id: 9},
  // ];
    return (
        <Box m='20px' width="60vw">
            <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Header title='Manage SSIs' subtitle='Manage your settlement instructions' />
            </Box>
            <Box sx={{ height: 400, width: '100%' ,
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
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                    }}
                    pageSizeOptions={[5]}
                />
            </Box>
        </Box>
        
    );
}

export default Managessi;