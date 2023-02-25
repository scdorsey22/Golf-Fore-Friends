import { useState } from "react";
import {useTheme} from '@mui/material/styles'
import { useHistory } from "react-router-dom";

//material-ui

import {
    Grid,
    TextField,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';

//third party

import { Formik } from 'formik';

import { useDispatch } from 'react-redux';
import { registerUser} from '../slices/userSlice';

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


function RegisterForm1() {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [createAccountForm, setCreateAccountForm] = useState(initialForm);
    const [errors, setErrors] = useState(null);
    const history = useHistory();
    

    const dispatch = useDispatch();
  
    

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
      
        dispatch(registerUser(createAccountForm)).then((result) => {
          if (registerUser.fulfilled.match(result)) {
            setErrors(null);
            setCreateAccountForm(initialForm);
            history.push('/');
          } else if (registerUser.rejected.match(result)) {
            setCreateAccountForm(initialForm);
            setErrors(result.payload.errors);
          }
        });
      }

   
      return (
        <>
          <Formik>
            <form noValidate onSubmit={handleCreateSubmit}>
              {errors &&
                errors.map((error, index) => (
                  <p key={index} style={{ color: 'red' }}>
                    {error}
                  </p>
                ))}
              <Grid container spacing={2} sx={{ padding: '4px' }}>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Email</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-email-register"
                          type="email"
                          name="email"
                          label="Email Address"
                          value={createAccountForm.email}
                          onChange={handleCreateChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="outlined-adornment-email-register">
                          Username
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-email-register"
                          type="username"
                          name="username"
                          label="Username"
                          value={createAccountForm.username}
                          onChange={handleCreateChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password-register">
                          Password
                        </InputLabel>
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
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
      );
      
      




}

export default RegisterForm1;
