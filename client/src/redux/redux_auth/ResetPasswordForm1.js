import { useState } from "react";
import {useHistory} from "react-router-dom"

//material-ui

import {
    Box,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
    InputAdornment,
} from '@mui/material';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { Formik } from 'formik';

const initialForm = {
    token: "",
    email: "",
    password: "",
  }


function ResetPasswordForm1() {
    const [showPassword, setShowPassword] = useState(false);
    const[resetPassword, setResetPassword]=useState(initialForm)
    const [errors, setErrors] = useState(null);
    const history = useHistory();


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function handleResetPasswordChange(e) {
        const target = e.target.name;
        const value = e.target.value;
        setResetPassword({ ...resetPassword, [target]: value });
      }

    const handleSubmit = (e) => {
            e.preventDefault()

            fetch('/api/reset_password', {
                credentials: "include",
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(resetPassword)
            }).then((r) => {
                if (r.ok) {
                    r.json().then((user) => {
                    setErrors(null);
                    setResetPassword(initialForm);
                    history.push("/login");
                });
                } else {
                  r.json().then((err) => {
                    setResetPassword(initialForm);
                    setErrors(err);
                  });
                }
              });
            }

    return(

        <>
            <Formik>
                    <form>
                    <FormControl fullWidth sx={{padding: '2px'}} >
                            <InputLabel htmlFor="outlined-adornment-email-login">Token</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="token"
                                name="token"
                                label="Token"
                                inputProps={{}}
                                value={resetPassword.token}
                                onChange={handleResetPasswordChange} 
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{padding: '2px'}} >
                            <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                name="email"
                                label="Email"
                                inputProps={{}}
                                value={resetPassword.email}
                                onChange={handleResetPasswordChange} 
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{padding: '2px'}} >
                            <InputLabel htmlFor="outlined-adornment-password-login">New Password</InputLabel>
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
                                value={resetPassword.password}
                                onChange={handleResetPasswordChange}
                                inputProps={{}}
                                
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
                                    borderRadius= '12px'
                                    onClick={handleSubmit}
                                >
                                    Reset Password
                                </Button>
                        </Box>
                    </form>
            </Formik>
          </>

    )
}

export default ResetPasswordForm1;