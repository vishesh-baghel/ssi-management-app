import React from 'react';
import Header from '../../components/Header';
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { addUser } from '../../services/userservices';

const Adduser = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values, actions) => {
        addUser(values).then(res => {
            if (res.status === 201) {
                alert("User Added..")
                actions.resetForm();
            }
        })
    };

    const initialValues = {
        userName: "",
        userEmail: "",
        userCompany: "",
        userRole: ""
    };

    const toggle = [
        {
            value: true,
            label: "Admin"
        },
        {
            value: false,
            label: "User"
        }
    ]

    const userSchema = yup.object().shape({
        userName: yup
            .string()
            .required("required"),
        userEmail: yup.string().email().required("required"),
        userCompany: yup.string().required("required"),
        userRole: yup.boolean().required("required")
    });
    return (
        <Box m='20px'>
            {/* <Box display='flex' justifyContent='space-between' alignItems='center'> */}
            <Header title='Add Users' subtitle='Add your team members' />
            <Box height='40vh' width='30vw' >
                {/* <Box display='flex' justifyContent='space-between' alignItems='center'> */}

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
                            <Box display="grid" gap="30px" gridTemplateColumns="repeat(1,minmax(0,2fr))" sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, }}>

                                <TextField
                                    autoComplete='off'
                                    variant="filled"
                                    type="text"
                                    label="Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.userName}
                                    name="userName"
                                    error={!!touched.userName && !!errors.userName}
                                    helperText={touched.userName && errors.userName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    autoComplete='off'
                                    variant="filled"
                                    type="email"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.userEmail}
                                    name="userEmail"
                                    error={!!touched.userEmail && !!errors.userEmail}
                                    helperText={touched.userEmail && errors.userEmail}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    autoComplete='off'
                                    variant="filled"
                                    type="text"
                                    label="Company"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.userCompany}
                                    name="userCompany"
                                    error={!!touched.userCompany && !!errors.userCompany}
                                    helperText={touched.userCompany && errors.userCompany}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    autoComplete='off'
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Role"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.userRole}
                                    name="userRole"
                                    error={!!touched.userRole && !!errors.userRole}
                                    helperText={touched.userRole && errors.userRole}
                                    sx={{ gridColumn: "span 2" }}

                                >
                                    {toggle.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                            <Box display="flex" justifyContent="left" mt="30px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Add User
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
            {/* </Box> */}
        </Box>
    );
}

export default Adduser;