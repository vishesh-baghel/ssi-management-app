import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import { useState } from 'react';

import { Box, IconButton,Menu,MenuItem } from '@mui/material';


import DownloadIcon from '@mui/icons-material/Download';

import "./styles.css";


const Export = (props) => {

    const data = props.data
    const type = props.type

    const dummyMenuItems = [
        {
            title: "Export as PDF",
            id:"pdf"
        },
        {
            title: "Export as CSV",
            id:"csv"
        }
    ];

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };
    

    const exportCsv = () => {
        let csv_data = '';

        if(type==='user'){
            const csvString_User = [
                [
                    "id",
                    "userName",
                    "userEmail",
                    "userCompany",
                    "userRole"
                ],
                ...data.map(item => [
                    item.id,
                    item.userName,
                    item.userEmail,
                    item.userCompany,
                    item.userRole
                ])
            ].map(e => e.join(",")).join("\n");

            csv_data = `${csvString_User}`.split("\n").join('\n');
        }

        let CSVFile = new Blob([csv_data], { type: "text/csv" });
        var temp_link = document.createElement('a');
        temp_link.download = document.title;
        var url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);
        temp_link.click();
        document.body.removeChild(temp_link);
    }

    const exportPdf = () => {
        let pdf_data = '';
        if(type==='user'){
            const pdfString = [
                [
                    "id",
                    "userName",
                    "userEmail",
                    "userCompany",
                    "userRole"
                ],
                ...data.map(item => [
                    item.id,
                    item.userName,
                    item.userEmail,
                    item.userCompany,
                    item.userRole
                ])
            ].map(e => e.join(",")).join("\n");
            pdf_data = `${pdfString}`.split("\n");
        }
        const head = pdf_data.shift().split(",")
        const body = pdf_data.map(n => n.split(','))
        const doc = new jsPDF()
        autoTable(doc, {
            head: [head],
            body: body,
        });
        doc.save(document.title);
    }

    const handleClose = (e) => {
        setAnchorEl(null);
        if(e.target.id==='pdf'){
            exportPdf()
        }else if(e.target.id==='csv'){
            exportCsv();
        }
    };
    return (
        <Box>
            <IconButton aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                aria-label="Export"
                title="Export"><DownloadIcon /></IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {dummyMenuItems.map(item => (
                    <MenuItem onClick={handleClose} key={item.title} id={item.id} value={item.title}>
                        {item.title}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}
export default Export