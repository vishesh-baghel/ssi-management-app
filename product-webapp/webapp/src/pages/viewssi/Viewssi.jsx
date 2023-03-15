import * as React from 'react';
import {useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box} from '@mui/material';
import { useParams } from 'react-router-dom';
import {getSSIbySsiID} from '../../services/userservices';
export default function Viewssi() {

  const [ssidata,setSsiData] = useState([])
  
  const params = useParams()

  const updateData = ()=>{
    // console.log(params.id);
    getSSIbySsiID(params.id).then(res=>{
      setSsiData(res.data[0])
      console.log(res.data[0]);
    })
  }
  
  useEffect(()=>{
    updateData()
  },[])


  return (
<Box mr='1vh' ml='1vh'>
    <TableContainer sx={{
        width: "auto",
        height: '91vh',
        backgroundColor: 'primary.dark',
        borderRadius: '7px',
      }}>
      <Table>
        <TableHead> 
          <TableRow>
            <TableCell colSpan={5}>
            <h1><b>SSI Details</b></h1>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>id :</TableCell><TableCell>{ssidata.id}</TableCell>
            <TableCell>correspondentAccountNumber :</TableCell><TableCell>{ssidata.correspondentAccountNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ssiRefId :</TableCell><TableCell>{ssidata.ssiRefId}</TableCell>
            <TableCell>correspondentAccountName :</TableCell><TableCell>{ssidata.correspondentAccountName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>description :</TableCell><TableCell>{ssidata.description}</TableCell>
            <TableCell>intermediaryAccountNo1 :</TableCell><TableCell>{ssidata.intermediaryAccountNo1}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>product :</TableCell><TableCell>{ssidata.product}</TableCell>
            <TableCell>intermediaryBankBic1 :</TableCell><TableCell>{ssidata.intermediaryBankBic1}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>entityRefId :</TableCell><TableCell>{ssidata.entityRefId}</TableCell>
            <TableCell>intermediaryAccountNo2 :</TableCell><TableCell>{ssidata.intermediaryAccountNo2}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>currency :</TableCell><TableCell>{ssidata.currency}</TableCell>
            <TableCell>intermediaryBankBic2 :</TableCell><TableCell>{ssidata.intermediaryBankBic2}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>country :</TableCell><TableCell>{ssidata.country}</TableCell>
            <TableCell>intermediaryAccountName1 :</TableCell><TableCell>{ssidata.intermediaryAccountName1}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>assetClass :</TableCell><TableCell>{ssidata.assetClass}</TableCell>
            <TableCell>intermediaryAccountName2 :</TableCell><TableCell>{ssidata.intermediaryAccountName2}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>accountNumber :</TableCell><TableCell>{ssidata.accountNumber}</TableCell>
            <TableCell>isActive :</TableCell><TableCell>{ssidata.isActive}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>accountName :</TableCell><TableCell>{ssidata.accountName}</TableCell>
            <TableCell>isPrimary :</TableCell><TableCell>{ssidata.isPrimary}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>accountType :</TableCell><TableCell>{ssidata.accountType}</TableCell>
            <TableCell>isApproved :</TableCell><TableCell>{ssidata.isApproved}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>routingCode :</TableCell><TableCell>{ssidata.routingCode}</TableCell>
            <TableCell>effectiveDate :</TableCell><TableCell>{ssidata.effectiveDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>correspondentBankName :</TableCell><TableCell>{ssidata.correspondentBankName}</TableCell>
            <TableCell>expiryDate :</TableCell><TableCell>{ssidata.expiryDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>correspondentBankBic :</TableCell><TableCell>{ssidata.correspondentBankBic}</TableCell>
            <TableCell>approvedTs :</TableCell><TableCell>{ssidata.approvedTs}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>beneficiaryBankName :</TableCell><TableCell>{ssidata.beneficiaryBankName}</TableCell>
            <TableCell>approvedBy :</TableCell><TableCell>{ssidata.approvedBy}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>beneficiaryBankBIC :</TableCell><TableCell>{ssidata.beneficiaryBankBIC}</TableCell>
            <TableCell>customField :</TableCell><TableCell>{ssidata.customField}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>correspondentAccountNumber :</TableCell><TableCell>{ssidata.correspondentAccountNumber}</TableCell>
            <TableCell>createdBy :</TableCell><TableCell>{ssidata.createdBy}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell> </TableCell><TableCell> </TableCell>
            <TableCell>updatedBy :</TableCell><TableCell>{ssidata.updatedBy}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}