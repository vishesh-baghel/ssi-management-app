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
import { getSsi } from '../../services/userservices';
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
    getSsi({
      filter:[
        {
          "column":"ssiRefId",
          "operator":"equal",
          "values":[params.id]
        }
      ]
    }).then(res => {
      setSsiData(res.data.results[0])
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
              <TableCell sx={{ width: "14vw" }}>ID :</TableCell><TableCell sx={{ width: "34vw" }} align='left'>{ssidata.id ? ssidata.id : " - - NA - - "}</TableCell>
              <TableCell>Correspondent Account Name :</TableCell><TableCell>{ssidata.correspondanceAccountName ? ssidata.correspondanceAccountName : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SSI RefId :</TableCell><TableCell>{ssidata.ssiRefId ? ssidata.ssiRefId : " - - NA - - "}</TableCell>
              <TableCell>Intermediary Account No 1 :</TableCell><TableCell>{ssidata.intermediary1AccountNumber ? ssidata.intermediary1AccountNumber : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description :</TableCell><TableCell>{ssidata.description ? ssidata.description : " - - NA - - "}</TableCell>
              <TableCell>Intermediary Bank BIC 1 :</TableCell><TableCell>{ssidata.intermediary1BankBic ? ssidata.intermediary1BankBic : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product :</TableCell><TableCell>{ssidata.product ? ssidata.product : " - - NA - - "}</TableCell>
              <TableCell>Intermediary Account No 2 :</TableCell><TableCell>{ssidata.intermediary2AccountNumber ? ssidata.intermediary2AccountNumber : " - - NA - - "}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Entity RefId :</TableCell><TableCell>{ssidata.entityRefId ? ssidata.entityRefId : " - - NA - - "}</TableCell>
              <TableCell>Intermediary Bank BIC 2 :</TableCell><TableCell>{ssidata.intermediary2BankBic ? ssidata.intermediary2BankBic : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Currency :</TableCell><TableCell>{ssidata.currency ? ssidata.currency : " - - NA - - "}</TableCell>
              <TableCell>Intermediary Account Name 1 :</TableCell><TableCell>{ssidata.intermediary1AccountName ? ssidata.intermediary1AccountName : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Country :</TableCell><TableCell>{ssidata.country ? ssidata.country : " - - NA - - "}</TableCell>
              <TableCell>Intermediary Account Name 2 :</TableCell><TableCell>{ssidata.intermediary2AccountName ? ssidata.intermediary2AccountName : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Asset Class :</TableCell><TableCell>{ssidata.assetClass ? ssidata.assetClass : " - - NA - - "}</TableCell>
              <TableCell>Is Active :</TableCell><TableCell>{ssidata.active ? ssidata.active : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Account Number :</TableCell><TableCell>{ssidata.accountNumber ? ssidata.accountNumber : " - - NA - - "}</TableCell>
              <TableCell>Is Primary :</TableCell><TableCell>{ssidata.primary ? ssidata.primary : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Account Name :</TableCell><TableCell>{ssidata.accountName ? ssidata.accountName : " - - NA - - "}</TableCell>
              <TableCell>Is Approved :</TableCell><TableCell>{ssidata.approved ? ssidata.approved : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Account Type :</TableCell><TableCell>{ssidata.accountType ? ssidata.accountType : " - - NA - - "}</TableCell>
              <TableCell>Effective Date :</TableCell><TableCell>{ssidata.effectiveDate ? ssidata.effectiveDate : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Routing Code :</TableCell><TableCell>{ssidata.routingCode ? ssidata.routingCode : " - - NA - - "}</TableCell>
              <TableCell>Expiry Date :</TableCell><TableCell>{ssidata.expiryDate ? ssidata.expiryDate : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Correspondent Bank Name :</TableCell><TableCell>{ssidata.correspondanceBankName ? ssidata.correspondanceBankName : " - - NA - - "}</TableCell>
              <TableCell>Approved TS :</TableCell><TableCell>{ssidata.approvedTs ? ssidata.approvedTs : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Correspondent Bank BIC :</TableCell><TableCell>{ssidata.correspondanceBankBic ? ssidata.correspondanceBankBic : " - - NA - - "}</TableCell>
              <TableCell>Approved By :</TableCell><TableCell>{ssidata.approvedBy ? ssidata.approvedBy : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Beneficiary Bank Name :</TableCell><TableCell>{ssidata.beneficiaryBankName ? ssidata.beneficiaryBankName : " - - NA - - "}</TableCell>
              <TableCell>Custom Field :</TableCell><TableCell>{ssidata.customField ? ssidata.customField : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Beneficiary Bank BIC :</TableCell><TableCell>{ssidata.beneficiaryBankBIC ? ssidata.beneficiaryBankBIC : " - - NA - - "}</TableCell>
              <TableCell>Created By :</TableCell><TableCell>{ssidata.createdBy ? ssidata.createdBy : " - - NA - - "}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Correspondent Account Number :</TableCell><TableCell>{ssidata.correspondanceAccountNumber ? ssidata.correspondanceAccountNumber : " - - NA - - "}</TableCell>
              <TableCell>Updated By :</TableCell><TableCell>{ssidata.updatedBy ? ssidata.updatedBy : " - - NA - - "}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}