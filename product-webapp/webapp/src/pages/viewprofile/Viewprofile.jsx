import React from 'react';
import { useCallback, useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { Formik, useFormik } from 'formik';
//rt { postData } from '../../userservices/userServices';
import { getUserbyId } from '../../services/userservices';
import { useParams } from 'react-router-dom';
import { display } from '@mui/system';




export const Viewprofile = () => {

    const [userData, setuserData] = useState([])
    const [enableBtn, setenableBtn] = useState(true)
    const Enable = () => {
        setenableBtn(false);
    }


    const id = 21;
    const getData = () => {
        getUserbyId(id)
            .then(data => {
                setuserData(data.data)
            })
    }
    useEffect(() => {
        getData()


    }, [])



    return (
        <Formik

            intialValues={{
                name: userData.userName,
                email: userData.userEmail,
                id: userData.id,

            }

            }
        >
            {props => (<form
                autoComplete="off"
                noValidate
                onSubmit={props.handleSubmit}
            >

               <Card >
               <CardContent sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:'10px'}}>
               
                    <Box sx={{m: -1.5, width: '50%' }}
                    >
                        <Grid
                            container
                            spacing={3}

                        >
                            <Grid
                                xs={12}
                                lg={12}
                            >
                                <TextField
                                    variant='filled'
                                    fullWidth
                                    helperText="Please specify the name"
                                    label="name"
                                    name="Name"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    //onChange={props.handleChange}
                                    required
                                    value={userData.userName}
                                />
                            </Grid>
                            {/* <Grid
                  xs={12}
                  md={3}
                /> */}
                            {/*<TextField
                    fullWidth
                    label="Last name"
                    name="lastName"
                    //onChange={props.handleChange}
                    required
                  value={userData.userName.split[-1]}
                />*/}


                            <Grid
                                xs={12}
                                lg={12}

                            >
                                <TextField
                                    variant='filled'
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    //onChange={props.handleChange}

                                    required
                                    value={userData.userEmail}

                                >
                                </TextField>
                            </Grid>

                            <Grid
                                xs={12}
                                md={12}
                            >
                                <TextField
                                    variant='filled'

                                    fullWidth
                                    label="User-Id"
                                    name="id"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    //onChange={props.handleChange}
                                    required
                                    aria-readonly={true}
                                    value={userData.id}

                                />
                            </Grid>
                            {/* <Grid
                  xs={12}
                  md={6}
                /> */}


                            <Grid
                                xs={12}
                                md={12}
                            >
                                <TextField
                                    variant='filled'
                                    fullWidth
                                    label="Role"
                                    name="role"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    // onChange={props.handleChange}
                                    required

                                    aria-disabled

                                    value={userData.userRole ? "Admin" : "Client"}
                                >
                                    {/* {role.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))} */}
                                </TextField>
                            </Grid>
                        </Grid>
                        </Box>

                       
                            <Box
                                sx={{
                                   justifyContent:'center'
                                }}
                            >
                                {<Avatar

                                    sx={{
                                        fontSize:'5rem',
                                        height: '25vh',
                                        width:'25vw',
                                        mb: 2,

                                    }
                                    }
                                >VB</Avatar>}
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                >
                                    {userData.name}
                                </Typography>

                            
                      

                    </Box>
                    
                   
                </CardContent>
                <Divider />
                </Card>
               <CardActions>               
                 <Button variant="contained" onClick={() => Enable()} >
                    Edit
                </Button>
                <Button variant="contained" type='submit' >
                    Save details
                </Button>
                </CardActions>



            </form>
            )}
        </Formik>
    );
}
export default Viewprofile;