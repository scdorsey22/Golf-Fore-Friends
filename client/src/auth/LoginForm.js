import { useState } from "react";
import { Link } from "react-router-dom";

//material-ui

import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from '@mui/material';

//third party

import { Formik } from 'formik';

//assets
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const initialForm = {
    username: "",
    password: "",
  }

function LoginForm({ onCreateOrLog, responseFromAccountOrLogged }) {
    const [showPassword, setShowPassword] = useState(false);
    const [loginAccount, setLoginAccount] = useState(initialForm);
    const [errors, setErrors] = useState(null);

  function handleLoginChange(e) {
    const target = e.target.name;
    const value = e.target.value;
    setLoginAccount({ ...loginAccount, [target]: value });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(loginAccount),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setErrors(null);
          setLoginAccount(initialForm);
          onCreateOrLog(user);
        });
      } else {
        r.json().then((err) => {
          setLoginAccount(initialForm);
          setErrors(err);
        });
      }
    });
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
                        <FormControl fullWidth sx={{padding: '2px'}} >
                            <InputLabel htmlFor="outlined-adornment-username-login">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username-login"
                                type="username"
                                name="username"
                                label="Username"
                                inputProps={{}}
                                value={loginAccount.username}
                                onChange={handleLoginChange}
                               
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{padding: '2px'}} >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
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
                                value={loginAccount.password}
                                onChange={handleLoginChange}
                                inputProps={{}}
                                
                            />
                            </FormControl>
                            {errors ? <p>{errors.error}</p> : null}
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <Typography 
                            component={Link}
                            to="/forgot_password" 
                            variant="subtitle1" 
                            color="success.light" 
                            sx={{ textDecoration: 'none', cursor: 'pointer' }}
                            >
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
                                    borderRadius= '12px'
                                    onClick={handleLoginSubmit}
                                >
                                    Sign in
                                </Button>

                        </Box>
                    </form>
                    </Formik>
          </>

    )




}

export default LoginForm
