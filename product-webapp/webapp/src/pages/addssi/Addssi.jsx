import React from "react";
import Header from "../../components/Header";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { addSsi } from "../../services/userservices";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} {...props} />;
  });


const Addssi = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

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

    const handleFormSubmit = (values, actions) => {
        console.log(values);
        addSsi(values).then(res => {
            console.log(res)
            if (res.status === 201) {
                setMessage("SSI is added successfully");
                setSuccess(true);
                handleAlertOpen();
                actions.resetForm();
            }
        }).catch(error=>{
            console.log(error)
            setMessage("Something went wrong");
            handleAlertOpen();
        })
    };

    const initialValues = {
        accountNumber: "",
        accountName: "",
        accountType: "",
        currency: "",
        product: "",
        assetClass: "",
        expiryDate: "",
        country: "",
        routingCode: "",
        correspondanceAccountNumber: "",
        correspondanceAccountName: "",
        correspondanceBankName: "",
        correspondanceBankBic: "",
        beneficiaryBankName: "",
        beneficiaryBankBic: "",
        intermediary1AccountNumber: "",
        intermediary1AccountName: "",
        intermediary1BankBic: "",
        intermediary2AccountNumber: "",
        intermediary2AccountName: "",
        intermediary2BankBic: "",
    };

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
        routingCode: yup.number(),
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

    // disableDates = () => {
    //     var today, dd, mm, yyyy;
    //     today = new Date();
    //     dd = today.getDate() + 1;
    //     mm = today.getMonth() + 1;
    //     yyyy = today.getFullYear();
    //     return yyyy + "-" + mm + "-" + dd
    // }

    return (
        <>
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        {success ? <Alert onClose={handleClose} severity="success">
            {message}
        </Alert> : <Alert onClose={handleClose} severity="error">
            {message}
        </Alert>}
      </Snackbar>
            <Box m="20px">
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
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
                                    error={!!touched.accountName && !!errors.accountName}
                                    helperText={touched.accountName && errors.accountName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Account Type"
                                    // select
                                    // label="Account Type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.accountType}
                                    name="accountType"
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
                                    value={values.currency}
                                    name="currency"
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
                                    value={values.product}
                                    name="product"
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
                                    value={values.assetClass}
                                    name="assetClass"
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
                                    value={values.country}
                                    name="country"
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
                                    label="Routing Code"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.routingCode}
                                    name="routingCode"
                                    error={!!touched.routingCode && !!errors.routingCode}
                                    helperText={touched.routingCode && errors.routingCode}
                                    sx={{
                                        gridColumn: "span 2"
                                    }}
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
                                    error={!!touched.beneficiaryBankBic && !!errors.beneficiaryBankBic}
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
                                    error={!!touched.intermediary2BankBic && !!errors.intermediary2BankBic}
                                    helperText={touched.intermediary2BankBic && errors.intermediary2BankBic}
                                    sx={{ gridColumn: "span 2" }}
                                />

                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Button type="submit" variant="contained"
                                    sx={{
                                        backgroundColor: "#3f51b5",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#3f51b5",
                                            color: "#fff",
                                        },
                                    }}
                                >
                                    Add SSI
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>

    );
};

export default Addssi;