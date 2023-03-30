import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { tokens } from '../../themes';
import { deleteSSI, getSsi } from '../../services/userservices';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const Dash = () => {
  const clearTextField = (e) => {
    e.target.value = "";
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const [modifiedRows, setModifiedRows] = useState(rows);
  const [exportLink, setExportLink] = useState("");
    
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
      fetch('https://ssimanagementsystem.stackroute.io/ssi/fetch', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sortBy: "ssiRefId",
                orderBy: "asc",
                offset: 0,
                count: 10,
              }),
            }).then(response => response.json())
            .then(data => {
              setExportLink(data.exportLink);
            })
  }

    const handleSearch = (e) => {
    }

  const columns = [
    { field: 'ssiRefId', headerName: 'SSI ID', flex: 1 },
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
    {
        field: "product", 
        flex: 1,
        headerName: "Product",
    },
    {
        field: "accountNumber",
        flex: 1,
        headerName: "Account Number",
    },
    {
        field: "assetClass",
        flex: 1,
        headerName: "Asset Class",
    },
    {
        field: "currency",
        flex: 1,
        headerName: "Currency",
    },
    {
        field: "country",
        flex: 1,
        headerName: "Country",
    },
    {
        field: "correspondanceBankBic",
        flex: 1,
        headerName: "Correspondant",
    },
    {
        field: "beneficiaryBankBic",
        flex: 1,
        headerName: "Beneficiary",
    },
    {
        field: "expiryDate",
        flex: 1,
        headerName: "Expiry Date",
    }
    
  ];
  useEffect(() => {
    updateRows();
  }, []);
  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Dashboard' subtitle='Welcome to your dashboard' />
      </Box>
      <Box
        height='65vh'
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
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
                marginBottom: "10px",
            }}
            />
          <TextField
            // style={{ width: 110 }}
            InputLabelProps={{ shrink: true }}
            id="search-product" type="text"
            onBlur={clearTextField}
            onChange={(e) => {
                setModifiedRows(rows.filter((n) => String(n.product).toLowerCase().includes(e.target.value.toLowerCase())));
            }}
            label="Search Product"
            variant="standard"
            sx={{
              paddingRight: "10px",
              marginBottom: "10px",
            }}
            />
          <TextField
            // style={{ width: 110 }}
            InputLabelProps={{ shrink: true }}
            id="search-currency" type="text"
            onBlur={clearTextField}
            onChange={(e) => {
                setModifiedRows(rows.filter((n) => String(n.currency).toLowerCase().includes(e.target.value.toLowerCase())));
            }}
            label="Search Currency"
            variant="standard"
            sx={{
              paddingRight: "10px",
              marginBottom: "10px",
            }}
            />
        </Box>
        <Button 
          sx = {{
              color: `${colors.grey[100]} !important`,
              marginTop: "10px"
            }}
            onClick={() => { window.open(exportLink) }}>
              Export to csv: <FileDownloadOutlinedIcon />
          </Button>
          </Box>
        <DataGrid
          rows={modifiedRows}
          columns={columns}
          rowHeight={40}
        />
      </Box>
    </Box>

  );
}

export default Dash;