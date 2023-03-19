import React from 'react';
import { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    TextField,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';
import { Formik } from 'formik';
import { getUserbyId } from '../../services/userservices';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../themes';

export const Viewprofile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [userData, setuserData] = useState([]);
    const [enableBtn, setenableBtn] = useState(true);

    const Enable = () => {
        setenableBtn(false);
    };

    const id = 21;
    const getData = () => {
        getUserbyId(id)
            .then(data => {
                setuserData(data.data)
            })
    };

    useEffect(() => {
        getData()
    }, []);

    return (
        <Box sx={{
            m: 2,
            p: 2,
        }}>
        <Formik
            intialValues={{
                name: userData.userName,
                email: userData.userEmail,
                id: userData.id,
            }}
            >
            {props => (<form
                autoComplete="off"
                noValidate
                onSubmit={props.handleSubmit}
                >
                    <Box 
                        width='30vw'
                        display='flex'
                        flexDirection='row'
                    >
                        <Grid container spacing={3} >
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
                                    
                                    value={userData.userRole ? "Admin" : "User"}
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
                {/* </CardContent> */}
               <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        mt: 2,
                    }}
               >
                 <Button 
                    variant="contained" 
                    onClick={() => Enable()} 
                    sx={{
                        mr: 1,
                        backgroundColor: colors.greenAccent[500],
                    }}
                    >
                    Edit
                </Button>
                <Button 
                    variant="contained" 
                    sx={{
                        backgroundColor: colors.greenAccent[500],
                    }}
                >
                    Save details
                </Button>
                </Box>        
            </form>
            )}
        </Formik>
        </Box> 
    );
}
export default Viewprofile;