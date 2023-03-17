import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getSSIbySsiID } from '../../services/userservices';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../themes';
import Header from '../../components/Header';


let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

export default function Viewssi() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [ssidata, setSsiData] = useState([])

  const params = useParams()

  const updateData = () => {
    // console.log(params.id);
    getSSIbySsiID(params.id).then(res => {
      setSsiData(res.data[0])
      console.log(res.data[0]);
    })
  }

  useEffect(() => {
    updateData()
  }, [])


  return (
    <Box m='2vw' mb='0vh' sx={{
      "& .MuiTableCell-root": {
        fontSize: '16px', fontWeight: 'bolder'
      },
    }}>
      <Header title='SSI details' subtitle='Settlement instruction details' />
      <TableContainer sx={{
        width: "auto",
        height: '68vh',
        backgroundColor: colors.background,
      }}>
        <Table>
          <TableHead>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: "14vw" }}>ID :</TableCell><TableCell sx={{ width: "34vw" }} align='left'>{ssidata.id}</TableCell>
              <TableCell>Correspondent Account Name :</TableCell><TableCell>{ssidata.correspondentAccountName ? ssidata.correspondentAccountName : ""}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SSI RefId :</TableCell><TableCell>{ssidata.ssiRefId}</TableCell>
              <TableCell>Intermediary Account No 1 :</TableCell><TableCell>{ssidata.intermediaryAccountNo1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description :</TableCell><TableCell>{ssidata.description}</TableCell>
              <TableCell>Intermediary Bank BIC 1 :</TableCell><TableCell>{ssidata.intermediaryBankBic1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product :</TableCell><TableCell>{ssidata.product}</TableCell>
              <TableCell>Intermediary Account No 2 :</TableCell><TableCell>{ssidata.intermediaryAccountNo2}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Entity RefId :</TableCell><TableCell>{ssidata.entityRefId}</TableCell>
              <TableCell>Intermediary Bank BIC 2 :</TableCell><TableCell>{ssidata.intermediaryBankBic2}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Currency :</TableCell><TableCell>{ssidata.currency}</TableCell>
              <TableCell>Intermediary Account Name 1 :</TableCell><TableCell>{ssidata.intermediaryAccountName1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Country :</TableCell><TableCell>{ssidata.country}</TableCell>
              <TableCell>Intermediary Account Name 2 :</TableCell><TableCell>{ssidata.intermediaryAccountName2}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Asset Class :</TableCell><TableCell>{ssidata.assetClass}</TableCell>
              <TableCell>Is Active :</TableCell><TableCell>{ssidata.isActive}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Account Number :</TableCell><TableCell>{ssidata.accountNumber}</TableCell>
              <TableCell>Is Primary :</TableCell><TableCell>{ssidata.isPrimary}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Account Name :</TableCell><TableCell>{ssidata.accountName}</TableCell>
              <TableCell>Is Approved :</TableCell><TableCell>{ssidata.isApproved}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Account Type :</TableCell><TableCell>{ssidata.accountType}</TableCell>
              <TableCell>Effective Date :</TableCell><TableCell>{ssidata.effectiveDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Routing Code :</TableCell><TableCell>{ssidata.routingCode}</TableCell>
              <TableCell>Expiry Date :</TableCell><TableCell>{ssidata.expiryDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Correspondent Bank Name :</TableCell><TableCell>{ssidata.correspondentBankName}</TableCell>
              <TableCell>Approved TS :</TableCell><TableCell>{ssidata.approvedTs}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Correspondent Bank BIC :</TableCell><TableCell>{ssidata.correspondentBankBic}</TableCell>
              <TableCell>Approved By :</TableCell><TableCell>{ssidata.approvedBy}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Beneficiary Bank Name :</TableCell><TableCell>{ssidata.beneficiaryBankName}</TableCell>
              <TableCell>Custom Field :</TableCell><TableCell>{ssidata.customField}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Beneficiary Bank BIC :</TableCell><TableCell>{ssidata.beneficiaryBankBIC}</TableCell>
              <TableCell>Created By :</TableCell><TableCell>{ssidata.createdBy}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Correspondent Account Number :</TableCell><TableCell>{ssidata.correspondentAccountNumber}</TableCell>
              <TableCell>Updated By :</TableCell><TableCell>{ssidata.updatedBy}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}