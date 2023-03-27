import React from 'react';
// import Header from '../../components/Header';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from "../../themes";
// import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { getSsi } from '../../services/userservices';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { getUsers } from '../../services/userservices';
import Export from '../../components/Export/Export';
import 'antd/dist/reset.css';
import { Table } from 'ant-table-extensions';

const Dashboard = () => {

    const clearTextField = (e) => {
        e.target.value = "";
    }

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setloading] = useState(false)
    const [dataSource, setdataSource] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setpageSize] = useState(10)

    useEffect(() => {
        setloading(true)
        fetch("http://localhost:3001/SSI")
            .then(response => response.json())
            .then(data => { setdataSource(data) })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setloading(false)
            })
    }, [])

    const [rows, setRows] = useState([]);
    const [modifiedRows, setModifiedRows] = useState(rows);

    useEffect(()=>{
        getSsi({filter:[]}).then(res => {
            if (res.status===200){
                let rows = res.data.results
                rows.forEach((item, i) => {
                    item.id = i + 1;
                });
                setRows(rows);
                setModifiedRows(rows);
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
        <div className="Dashboard">
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
            <Table
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    total: 500,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setpageSize(pageSize)
                    }
                }}
            >

            </Table>
        </div>

    );
};

export default Dashboard;