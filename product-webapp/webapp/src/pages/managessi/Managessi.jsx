import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { tokens } from '../../themes';
import { deleteSSI, getSsi, editSsi } from '../../services/userservices';
import { useState } from 'react';
import { TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref}  {...props} />;
});

const Managessi = () => {
  const clearTextField = (e) => {
    e.target.value = "";
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const [modifiedRows, setModifiedRows] = useState(rows);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleAlertOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
    
  const updateRows = ()=>{
      getSsi({
        "sort":{
          "column":"ssiRefId",
          "order":"desc"
        }
      }).then(res=>{
          if(res.status===200){
            let rows = res.data.results
            rows.forEach((item, i) => {
                item.id = i + 1;
            });
            setRows(rows);
            setModifiedRows(rows);
          }
      })
  }

  const delSSI = (ssiId) => {
    deleteSSI(ssiId).then(response => {
      if (response.status === 200) {
        setMessage("SSI Deleted Successfully");
        setSuccess(true);
        handleAlertOpen();
        updateRows();
      }
      else {
        setMessage("Something went wrong");
        handleAlertOpen();
      }
    }).catch(error => {
      console.log(error)
    })
  }

  const makePrimary = (ssiId) => {
    console.log(ssiId);
    let tempObj = {}
    getSsi({
      filter:[
        {
          "column":"ssiRefId",
          "operator":"equal",
          "value":ssiId
        }
      ]
    })
    .then(response=>{
      if (response.status===200){
        tempObj = response.data;
        tempObj.isPrimary ? tempObj.isPrimary = false : tempObj.isPrimary = true;
        editSsi(ssiId, tempObj)
        .then(response=>{
          if (response.status==="OK"){
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
    { field: 'ssiRefId', headerName: 'SSI ID', flex: 1 },
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
          onClick={() => { delSSI(params.row.id) }}
          showInMenu
        />,
        <GridActionsCellItem
          // icon={<DeleteIcon />}
          label="Make SSI Primary"
          onClick={() => { makePrimary(params.row.ssiRefId) }}
          showInMenu
        />,
      ]
    }
  ];
  useEffect(() => {
    updateRows();
  }, []);
  return (
    <>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        {success ? <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert> : <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>}
      </Snackbar>
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Manage SSIs' subtitle='Manage your settlement instructions' />
      </Box>
      <Box
        height='70vh'
        width='100%'
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
        }}>
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
              paddingRight: "10px",
              paddingBottom: "10px"
            }}
          />
        </Box>
        <DataGrid
          rows={modifiedRows}
          columns={columns}
          rowHeight={40}
        />
      </Box>
    </Box>
  </>
  );
}

export default Managessi;