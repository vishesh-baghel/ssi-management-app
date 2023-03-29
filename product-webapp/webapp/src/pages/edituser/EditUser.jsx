import { Box, Button, MenuItem, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from "yup";
import Header from '../../components/Header';
import { editUser } from '../../services/userservices';

const EditUser = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [editUserData, setEditUserData] = useState([])

    const params = useParams()

    const handleFormSubmit = (values) => {
        editUser(values.id, values).then(res => {
            console.log(res.data);
            if (res.status === 200) {
                alert("User is Edited Successfully")
            }
        }).catch(err => alert(err.response.data))
    };

    const updateData = () => {
        // console.log(params.id);
        editUser({
            filter: [{
                "column": "id",
                "operator": "equal",
                "values": [params.id]
            }]
        }).then(res => {
            console.log(res);
            setEditUserData(res.data.results[0])
        })
    }


    useEffect(() => {
        updateData()
    }, [])

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
        userPassword: yup.string().required("required"),
        userEmail: yup.string().email().required("required"),
        userCompany: yup.string().required("required"),
        userRole: yup.boolean().required("required")
    });
    return (
        <Box m='20px'>
            <Header title='Edit Users' subtitle='Edit your team members' />
            <Box m='0 10rem' >

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={editUserData}
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
                                    InputLabelProps={{ shrink: true, }}
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
                                    InputLabelProps={{ shrink: true, }}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    autoComplete='off'
                                    variant="filled"
                                    type="text"
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.userPassword}
                                    name="userPassword"
                                    error={!!touched.userPassword && !!errors.userPassword}
                                    helperText={touched.userPassword && errors.userPassword}
                                    InputLabelProps={{ shrink: true, }}
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
                                    InputLabelProps={{ shrink: true, }}
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
                                    value={!!values.userRole ? values.userRole : ""}
                                    name="userRole"
                                    error={!!touched.userRole && !!errors.userRole}
                                    helperText={touched.userRole && errors.userRole}
                                    InputLabelProps={{ shrink: true, }}
                                    sx={{ gridColumn: "span 2" }}

                                >
                                    {toggle.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                            <Box display="flex" justifyContent="center" mt="30px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Edit User
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

export default EditUser;