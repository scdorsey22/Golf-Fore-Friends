import React, { useState } from 'react'
import { Box, Grid, TextField, Button, InputAdornment, Typography} from "@mui/material"
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouteLink } from "react-router-dom";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import HomeIcon from '@mui/icons-material/Home';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';

import { updateUser, selectUser } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function MyAccount1() {

    const dispatch = useDispatch()
    const currentUser = useSelector(selectUser)
    
    // Set the initial form values to the current user data
    const [updateUserForm, setUpdateUserForm] = useState({
      first_name: currentUser.data.first_name,
      last_name: currentUser.data.last_name,
      profile_pic: currentUser.data.profile_pic,
      username: currentUser.data.username,
      email: currentUser.data.email,
      city: currentUser.data.city,
      state: currentUser.data.state,
      handicap: currentUser.data.handicap,
    });

    // Handle changes to the form fields
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdateUserForm({
        ...updateUserForm,
        [name]: value,
      });
    };

    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateUser(updateUserForm))
        .catch((error) => {
          console.log(error);
        });
    };
    
    return (
        <Box>
        <Box borderBottom="1px solid #ccc" padding="20px 20px">
          <Grid container alignItems="center">
            <Grid item sx={{ mr: "10px" }}>
              <RouteLink to="/">
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </RouteLink>
            </Grid>
            <Grid item>
              <Typography variant="h6">Edit My Account</Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container style={{ display: "inline-block", width: "80%", margin: "auto", justifyContent: "space-evenly" }}>
            
                <form onSubmit={handleSubmit}>
                    <Grid container 
                    alignItems="center"
                    justify="center"
                    direction="row"
                    margin="auto">
                    <Grid item margin="auto" marginTop="5%" marginBottom="2%">
                    <TextField
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ContactPageIcon/>
                                </InputAdornment>
                            ),
                            }}
                            id="first_name"
                            name="first_name"
                            label="First Name"
                            type="text"
                            value={updateUserForm.first_name}
                            onChange={handleChange}
                            
                        />
                    </Grid>
                    <Grid item margin="auto" marginTop="5%" marginBottom="2%">
                    <TextField
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <ContactPageIcon/>
                                </InputAdornment>
                            ),
                            }}
                            id="last_name"
                            name="last_name"
                            label="Last Name"
                            type="text"
                            value={updateUserForm.last_name}
                            onChange={handleChange}
                            
                        />
                    </Grid>
                    <Grid item margin="auto" style={{ marginTop: "2.5%", marginBottom: "2.5%" }} >
                        <TextField
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <ContactPageIcon/>
                            </InputAdornment>
                            ),
                        }}
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        value={updateUserForm.username}
                        onChange={handleChange}
                        
                        />
                    </Grid>
                    <Grid item margin="auto" style={{ marginTop: "2.5%", marginBottom: "2.5%" }} >
                        <TextField
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <ContactPageIcon/>
                            </InputAdornment>
                            ),
                        }}
                        id="email"
                        name="email"
                        label="Email"
                        type="text"
                        value={updateUserForm.email}
                        onChange={handleChange}
                        
                        />
                    </Grid>
                    <Grid item margin="auto" marginBottom="2%">
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <InsertPhotoIcon />
                            
                            </InputAdornment>
                        ),
                        }}
                        id="profile_pic"
                        name="profile_pic"
                        label="Profile Picture"
                        type="text"
                        value={updateUserForm.profile_pic}
                        onChange={handleChange}
                        
                    />
                    </Grid>
                    <Grid item margin="auto" style={{ marginTop: "2.5%", marginBottom: "2.5%" }} >
                        <TextField
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <GolfCourseIcon/>
                            </InputAdornment>
                            ),
                        }}
                        id="handicap"
                        name="handicap"
                        label="Handicap"
                        type="text"
                        value={updateUserForm.handicap}
                        onChange={handleChange}
                        
                        />
                    </Grid>
                    <Grid item margin="auto" style={{ marginTop: "2.5%", marginBottom: "2.5%" }} >
                        <TextField
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <HomeIcon/>
                            </InputAdornment>
                            ),
                        }}
                        id="city"
                        name="city"
                        label="City"
                        type="text"
                        value={updateUserForm.city}
                        onChange={handleChange}
                        
                        />
                    </Grid>
                    <Grid item margin="auto" style={{ marginTop: "2.5%", marginBottom: "2.5%" }} >
                        <TextField
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <HomeIcon/>
                            </InputAdornment>
                            ),
                        }}
                        id="state"
                        name="state"
                        label="State"
                        type="text"
                        value={updateUserForm.state}
                        onChange={handleChange}
                        
                        />
                    </Grid>
                    </Grid>
                    <Grid item margin="auto" style={{ marginTop: "2.5%", marginBottom: "2.5%" }}>
                    <Button type="submit" variant="contained"  color='success'
                        onSubmit={handleSubmit}>
                        Submit Changes
                    </Button>
                    </Grid>
                </form>
          
            </Grid>
        </Box>
  )
}
