import { useState } from "react";
import {useTheme} from '@mui/material/styles'

//material-ui

import {
    Grid,
    TextField,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from '@mui/material';

//third party

import * as Yup from 'yup';
import { Formik } from 'formik';


//assets
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


function RegisterForm() {
    const theme = useTheme();
    const [checked, setChecked] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const customInput = {
        marginTop: 1,
        marginBottom: 1,
        '& > label': {
            top: 23,
            left: 0,
            color: theme.grey500,
            '&[data-shrink="false"]': {
                top: 5
            }
        },
        '& > div > input': {
            padding: '30.5px 14px 11.5px !important'
        },
        '& legend': {
            display: 'none'
        },
        '& fieldset': {
            top: 0
        }
    }


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    return (
        <>
            
            <Formik>
                    <form>
                    <Grid container spacing={1} sx={{ 
                                        borderRadius: '24x',
                                        padding: '2px'
                                    }}>
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    name="fname"
                                    type="text"
                                    defaultValue=""
                                    sx={{ ...theme.typography.customInput }}
                    
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="lname"
                                    type="text"
                                    defaultValue=""
                                    sx={{ ...theme.typography.customInput }}
                                    />
                            </Grid>
                        </Grid>
                        
                            <FormControl fullWidth sx={{
                         padding: '2px'  }} >
                             <InputLabel >Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                name="email"
                                label="Email Address"
                                inputProps={{}}
                                sx={{ borderRadius: '12px',
                               }}
                            />
                            </FormControl>

                        <FormControl fullWidth x={{
                         padding: '2px'  }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                name="email"
                                label="Email Address / Username"
                                inputProps={{}}
                                sx={{ borderRadius: '12px', padding: '2px'}}
                            />
                        </FormControl>
                        <FormControl fullWidth x={{
                         padding: '2px'  }}>
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                                sx={{ padding: '2px'}}
                            />
                            </FormControl>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <Typography variant="subtitle1" color="success.light" sx={{ textDecoration: 'none', cursor: 'pointer', padding: '2px' }}>
                                Forgot Password?
                            </Typography>
                        </Stack>
                        
                        <Box sx={{ mt: 2 }}>
                            
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                >
                                    Sign in
                                </Button>

                        </Box>
                    </form>
                    </Formik>
          </>

    )




}

export default RegisterForm;
