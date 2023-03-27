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


    const columns = [
        {
            key: "1",
            title: "ID",
            dataIndex: "ssiRefId",
            sorter: (record1, record2) => {
                return record1.ssiRefId > record2.ssiRefId
            }
        },
        {
            key: "2",
            title: "Product",
            dataIndex: "product",
            // filters: [
            //     { text: 'Collateral', value: 'collateral' },
            //     { text: 'FX', value: 'fx' },
            //   ],
            //   width: '10%',
        },
        {
            key: "3",
            title: "View",
            dataIndex: "View SSI"
        },
        {
            key: "3",
            title: "Currency",
            dataIndex: "currency"
        },
        {
            key: "4",
            title: "Asset Class",
            dataIndex: "assetClass"
        },
        {
            key: "5",
            title: "Correspondent",
            dataIndex: "correspondentBankBic"
        },
        {
            key: "6",
            title: "Beneficiary",
            dataIndex: "beneficiaryBankBic"
        },
        {
            key: "7",
            title: "Currency",
            dataIndex: "currency"
        },
        {
            key: "8",
            title: "Effective Date",
            dataIndex: "effectiveDate"
        },
        {
            key: "9",
            title: "Expiry Date",
            dataIndex: "expiryDate"
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