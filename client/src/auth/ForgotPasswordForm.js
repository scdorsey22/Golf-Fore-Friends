import { useState } from "react";
import {useTheme} from '@mui/material/styles'

//material-ui

import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';

const initialForm = {
    email: "",
  }


function ForgotPasswordForm() {
    const[forgotPassword, setForgotPassword]=useState("")

    function handleForgotPasswordChange(e) {
        const target = e.target.name;
        const value = e.target.value;
        setForgotPassword({ ...forgotPassword, [target]: value });
      }

    return(

        <>
            
            <Formik>
                    <form>
                        <FormControl fullWidth sx={{padding: '2px'}} >
                            <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username-login"
                                type="email"
                                name="email"
                                label="Email"
                                inputProps={{}}
                                
                               
                            />
                        </FormControl>
                        
                        <Box sx={{ mt: 2 }}>
                            
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    borderRadius= '12px'
                                    
                                >
                                    Send Mail
                                </Button>

                        </Box>
                    </form>
                    </Formik>
          </>




    )
}

export default ForgotPasswordForm;