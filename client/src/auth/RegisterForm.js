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

const initialForm = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  }


function RegisterForm({ onCreateOrLog, responseFromAccountOrLogged }) {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [createAccountForm, setCreateAccountForm] = useState(initialForm);
    const [errors, setErrors] = useState(null);
  
    

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function handleCreateChange(e) {
        const target = e.target.name;
        const value = e.target.value;
        setCreateAccountForm({ ...createAccountForm, [target]: value });
      }

    function handleCreateSubmit(e) {
        e.preventDefault();
    
        fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(createAccountForm),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              setErrors(null);
              setCreateAccountForm(initialForm);
              onCreateOrLog(user);
            });
          } else {
            r.json().then((err) => {
              setCreateAccountForm(initialForm);
              setErrors(err);
            });
          }
        });
      }
    
   
    return (
        <>
            
            <Formik>
                    <form noValidate onSubmit={handleCreateSubmit} >
                    <Grid container spacing={1} sx={{padding: '4px'}}>
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    name="first_name"
                                    type="text"
                                    defaultValue=""
                                    sx={{ ...theme.typography.customInput }}
                                    value={createAccountForm.first_name}
                                    onChange={handleCreateChange}
                    
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="last_name"
                                    type="text"
                                    defaultValue=""
                                    sx={{ ...theme.typography.customInput }}
                                    value={createAccountForm.last_name}
                                    onChange={handleCreateChange}
                                    />
                            </Grid>
                        </Grid>
                        
                            <FormControl fullWidth sx={{padding: '4px'}} >
                             <InputLabel >Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                name="email"
                                label="Email Address"
                                value={createAccountForm.email}
                                onChange={handleCreateChange}
                                
                            />
                            </FormControl>

                        <FormControl fullWidth sx={{padding: '4px'}}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="username"
                                name="username"
                                label="Username"
                                value={createAccountForm.username}
                                onChange={handleCreateChange}
                                
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{padding: '4px'}}>
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
                                value={createAccountForm.password}
                                onChange={handleCreateChange}
                            />
                            </FormControl>
                            {errors ? <p>{errors.error}</p> : null}
                        
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
