import Header from "../../components/Header";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { editSsi } from "../../services/userservices";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSSIbySsiID } from "../../services/userservices";

const Editssi = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [ssiData, setSsiData] = useState([])

    const params = useParams()

    const handleFormSubmit = (values) => {
        // console.log(values.id);
        console.log(values.id,values);
        editSsi(values.id,values).then(res => {
            if (res.status === 200) {
                alert("SSI is Edited Successfully")
            }
        })
    };
    const updateData = () => {
        // console.log(params.id);
        getSSIbySsiID(params.id).then(res => {
            setSsiData(res.data[0])
        })
    }

    useEffect(() => {
        updateData()
    }, [])

    // const accRegExp = /^[a-zA-Z0-9]+$/;

    const bicRegExp = /^([A-Z]{6}[A-Z2-9][A-NP-Z1-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/;

    const countries = [
        {
            value: 'India',
            label: 'India',
        },
        {
            value: 'Austrailia',
            label: 'Austrailia',
        },
        {
            value: 'United States of America',
            label: 'United States of America',
        },
        {
            value: 'Germany',
            label: 'Germany',
        },
        {
            value: 'France',
            label: 'France',
        },
        {
            value: 'Japan',
            label: 'Japan',
        },
    ];

    const currencies = [
        {
            value: 'USD',
            label: 'USD',
        },
        {
            value: 'EUR',
            label: 'EUR',
        },
        {
            value: 'INR',
            label: 'INR',
        },
        {
            value: 'GBP',
            label: 'GBP',
        },
    ];

    const products = [
        {
            value: 'Collateral',
            label: 'Collateral',
        },
        {
            value: 'FX',
            label: 'FX',
        },
    ];

    const assetClasses = [
        {
            value: 'CASH',
            label: 'CASH',
        },
        {
            value: 'STOCKS',
            label: 'STOCKS',
        },
        {
            value: 'BONDS',
            label: 'BONDS',
        },
    ];

    const yesterday = new Date(Date.now() -86400000);


    const userSchema = yup.object().shape({
        accountNumber: yup.string().required("required"),
        accountName: yup.string(),
        accountType: yup.string(),
        currency: yup.string().required("required"),
        product: yup.string().required("required"),
        assetClass: yup.string().required("required"),
        expiryDate: yup.date().required("required").min(yesterday, 'Cannot add past date'),
        country: yup.string().required("required"),
        routingCode: yup.string(),
        correspondanceAccountNumber: yup.string(),
        correspondanceAccountName: yup.string(),
        correspondanceBankName: yup.string(),
        correspondanceBankBic: yup.string().matches(bicRegExp, "BIC is not valid").required("required"),
        beneficiaryBankName: yup.string().required("required"),
        beneficiaryBankBic: yup.string().matches(bicRegExp, "BIC is not valid").required("required"),
        intermediary1AccountNumber: yup.string(),
        intermediary1AccountName: yup.string(),
        intermediary1BankBic: yup.string().matches(bicRegExp, "BIC is not valid"),
        intermediary2AccountNumber: yup.string(),
        intermediary2AccountName: yup.string(),
        intermediary2BankBic: yup.string().matches(bicRegExp, "BIC is not valid"),
    });

    return (
        <>
            <Box m="20px">
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={ssiData}
                    enableReinitialize
                    validationSchema={userSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (


                        <form onSubmit={handleSubmit}>
                            <Header title="General Details" />
                            <Box display="grid" mb="30px" gap="10px" gridTemplateColumns="repeat(6,minmax(0,1fr))" sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, }}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Account Number *"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.accountNumber}
                                    name="accountNumber"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.accountNumber && !!errors.accountNumber}
                                    helperText={touched.accountNumber && errors.accountNumber}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Account Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.accountName}
                                    name="accountName"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.accountName && !!errors.accountName}
                                    helperText={touched.accountName && errors.accountName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Account Type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.accountType}
                                    name="accountType"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.accountType && !!errors.accountType}
                                    helperText={touched.accountType && errors.accountType}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Currency *"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={!!values.currency ? values.currency : ""}
                                    name="currency"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.currency && !!errors.currency}
                                    helperText={touched.currency && errors.currency}
                                    sx={{ gridColumn: "span 2" }}
                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Product *"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={!!values.product ? values.product : ""}
                                    name="product"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.product && !!errors.product}
                                    helperText={touched.product && errors.product}
                                    sx={{ gridColumn: "span 2" }}
                                >
                                    {products.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Asset Class *"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={!!values.assetClass ? values.assetClass : ""}
                                    name="assetClass"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.assetClass && !!errors.assetClass}
                                    helperText={touched.assetClass && errors.assetClass}
                                    sx={{ gridColumn: "span 2" }}
                                >
                                    {assetClasses.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Expiry Date *"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.expiryDate}
                                    name="expiryDate"
                                    error={!!touched.expiryDate && !!errors.expiryDate}
                                    helperText={touched.expiryDate && errors.expiryDate}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Country *"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={!!values.country ? values.country : ""}
                                    name="country"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.country && !!errors.country}
                                    helperText={touched.country && errors.country}
                                    sx={{ gridColumn: "span 2" }}
                                >

                                    {countries.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Routing Code *"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.routingCode}
                                    name="routingCode"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.routingCode && !!errors.routingCode}
                                    helperText={touched.routingCode && errors.routingCode}
                                    sx={{ gridColumn: "span 2" }}

                                />
                            </Box>
                            <Header title="Correspondent and Beneficiary" />
                            <Box display="grid" mb="30px" gap="10px" gridTemplateColumns="repeat(6,minmax(0,1fr))" sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, }}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Correspondance Account Number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.correspondanceAccountNumber}
                                    name="correspondanceAccountNumber"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.correspondanceAccountNumber && !!errors.correspondanceAccountNumber}
                                    helperText={touched.correspondanceAccountNumber && errors.correspondanceAccountNumber}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Correspondance Account Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.correspondanceAccountName}
                                    name="correspondanceAccountName"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.correspondanceAccountName && !!errors.correspondanceAccountName}
                                    helperText={touched.correspondanceAccountName && errors.correspondanceAccountName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Correspondance Bank Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.correspondanceBankName}
                                    name="correspondanceBankName"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.correspondanceBankName && !!errors.correspondanceBankName}
                                    helperText={touched.correspondanceBankName && errors.correspondanceBankName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Correspondance Bank BIC *"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.correspondanceBankBic}
                                    name="correspondanceBankBic"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.correspondanceBankBic && !!errors.correspondanceBankBic}
                                    helperText={touched.correspondanceBankBic && errors.correspondanceBankBic}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Beneficiary Bank Name *"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.beneficiaryBankName}
                                    name="beneficiaryBankName"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.beneficiaryBankName && !!errors.beneficiaryBankName}
                                    helperText={touched.beneficiaryBankName && errors.beneficiaryBankName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Beneficiary Bank BIC *"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.beneficiaryBankBic}
                                    name="beneficiaryBankBic"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.abeneficiaryBankBic && !!errors.beneficiaryBankBic}
                                    helperText={touched.beneficiaryBankBic && errors.beneficiaryBankBic}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </Box>
                            <Header title="Intermediary" />
                            <Box display="grid" mb="30px" gap="10px" gridTemplateColumns="repeat(6,minmax(0,1fr))" sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, }}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Intermediary 1 Account Number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.intermediary1AccountNumber}
                                    name="intermediary1AccountNumber"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.intermediary1AccountNumber && !!errors.intermediary1AccountNumber}
                                    helperText={touched.intermediary1AccountNumber && errors.intermediary1AccountNumber}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Intermediary 1 Account Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.intermediary1AccountName}
                                    name="intermediary1AccountName"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.intermediary1AccountName && !!errors.intermediary1AccountName}
                                    helperText={touched.intermediary1AccountName && errors.intermediary1AccountName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Intermediary 1 Bank BIC"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.intermediary1BankBic}
                                    name="intermediary1BankBic"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.intermediary1BankBic && !!errors.intermediary1BankBic}
                                    helperText={touched.intermediary1BankBic && errors.intermediary1BankBic}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Intermediary 2 Account Number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.intermediary2AccountNumber}
                                    name="intermediary2AccountNumber"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.intermediary2AccountNumber && !!errors.intermediary2AccountNumber}
                                    helperText={touched.intermediary2AccountNumber && errors.intermediary2AccountNumber}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Intermediary 2 Account Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.intermediary2AccountName}
                                    name="intermediary2AccountName"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.intermediary2AccountName && !!errors.intermediary2AccountName}
                                    helperText={touched.intermediary2AccountName && errors.intermediary2AccountName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Intermediary 2 Bank BIC"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.intermediary2BankBic}
                                    name="intermediary2BankBic"
                                    InputLabelProps={{ shrink: true, }}
                                    error={!!touched.intermediary2BankBic && !!errors.intermediary2BankBic}
                                    helperText={touched.intermediary2BankBic && errors.intermediary2BankBic}
                                    sx={{ gridColumn: "span 2" }}
                                />

                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Button type="submit" color="secondary" variant="contained">
                                    Update SSI
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>

    );
};

export default Editssi;