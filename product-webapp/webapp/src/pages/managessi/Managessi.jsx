import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { Box, Typography} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { tokens } from '../../themes';
import { deleteSSI, getSsi, getSSIbyID, putSSIbyID } from '../../services/userservices';
import { useState } from 'react';
import {TextField} from '@mui/material';

const Managessi = () => {
  const clearTextField = (e) => {
    e.target.value = "";
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const [modifiedRows, setModifiedRows] = useState(rows);
    
  const updateRows = ()=>{
      getSsi().then(res=>{
          if(res.status===200){
              setRows(res.data)
              setModifiedRows(res.data)
          }
      })
  }

  const delSSI = (ssiId) =>{
    //let flag = confirm("Are you Sure want to delete this SSI??")?true:false;
      deleteSSI(ssiId).then(response=>{
        if (response.status===200){
          alert("Success");
          updateRows();
        }
        else{
          alert("Something Err");
        }
      }).catch(error=>{
        console.log(error)
      })
  }
  const makePrimary = (ssiId) =>{
    let tempObj = {}
    getSSIbyID(ssiId)
    .then(response=>{
      if (response.status===200){
        tempObj = response.data;
  
        (tempObj.isPrimary)?(tempObj.isPrimary=false):(tempObj.isPrimary=true)
        putSSIbyID(ssiId, tempObj)
        .then(response=>{
          if (response.status===200 || response.status===201){
            alert("Success");
            updateRows();
          }
          else{
            alert("Something err..")
          }
        })
      }
    })
  }

  const columns = [
    { field: 'ssiRefId', headerName: 'SSI ID', flex: 1},
      {
        field: "edit",
        headerName: "Edit SSI",
        flex: 1,
        renderCell: (params) => {
          return (
            <Typography>
            <Link 
                to={`/dashboard/editssi/${params.row.ssiRefId}`}
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
                to={`/dashboard/ssi/${params.row.ssiRefId}`}
                style={{ textDecoration: 'none', color: colors.greenAccent[500], fontSize: '14px' }}
            >View
            </Link>
            </Typography>
          );
        },
      },
      { field: "isPrimary", headerName: "Is Primary", type: "boolean", headerAlign: "left", align: "left" },
      {
        field: "actions", type: "actions", align: "center", sortable: false, filterable: false, disableColumnMenu: true,
        getActions: (params) => [
            <GridActionsCellItem
                // icon={<DeleteIcon />}
                label="Delete SSI"
                onClick={()=>{delSSI(params.row.id)}}
                showInMenu
            />,
            <GridActionsCellItem
                // icon={<DeleteIcon />}
                label="Make SSI Primary"
                onClick={()=>{makePrimary(params.row.id)}}
                showInMenu
            />,
        ]
    }
  ];
  useEffect(()=>{
    updateRows();
  },[]);
    return (
        <Box m='20px'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Header title='Manage SSIs' subtitle='Manage your settlement instructions' />
            </Box>
            <Box 
                height='75vh'
                width='83vw'
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
                      <Box>
                  <TextField
                                // style={{ width: 110 }}
                      InputLabelProps={{ shrink: true }}
                      id="search-id" type="number"
                      onBlur={clearTextField}
                      onChange={(e) => {
                          setModifiedRows(rows.filter((n) => String(n.ssiRefId).toLowerCase().includes(e.target.value.toLowerCase())));
                      }}
                      label="Search Id"
                      variant="standard"
                      sx={{
                          paddingRight: "10px"
                      }}
                  />
              </Box>
                <DataGrid
                    rows={modifiedRows}
                    columns={columns}
                />
            </Box>
        </Box>
        
    );
}

export default Managessi;