import { useState } from "react";
import {useHistory} from "react-router-dom"

//material-ui

import {
    Box,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
} from '@mui/material';

import { Formik } from 'formik';

const initialForm = {
    email: "",
  }


function ForgotPasswordForm1() {
    const[forgotPassword, setForgotPassword]=useState(initialForm)
    const [errors, setErrors] = useState(null);
    const history = useHistory();

    function handleForgotPasswordChange(e) {
        const target = e.target.name;
        const value = e.target.value;
        setForgotPassword({ ...forgotPassword, [target]: value });
      }

    const handleSubmit = (e) => {
            e.preventDefault()

            fetch('/api/forgot_password', {
                credentials: "include",
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(forgotPassword)
            }).then((r) => {
                if (r.ok) {
                       
                    setErrors(null);
                    setForgotPassword(initialForm);
                    history.push("/reset_password");
    
                } else {
                  r.json().then((err) => {
                    setForgotPassword(initialForm);
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
                            <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                name="email"
                                label="Email"
                                inputProps={{}}
                                value={forgotPassword.email}
                                onChange={handleForgotPasswordChange} 
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
                                    Send Mail
                                </Button>
                        </Box>
                    </form>
            </Formik>
          </>

    )
}

export default ForgotPasswordForm1;