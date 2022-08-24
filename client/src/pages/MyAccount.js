import React, { useState } from 'react'
import { Box, Grid, TextField, Button, InputAdornment, Typography, useTheme } from "@mui/material"
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouteLink } from "react-router-dom";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import HomeIcon from '@mui/icons-material/Home';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';

function MyAccount({currentUser, setCurrentUser}) {
    const theme = useTheme();
    const [updateUser, setUpdateUser] = useState({
      first_name: currentUser.first_name,
      last_name: currentUser.last_name,
      profile_pic: currentUser.profile_pic,
      username: currentUser.username,
      city: currentUser.city,
      state: currentUser.state,
      handicap: currentUser.handicap,
    });

  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdateUser({
        ...updateUser,
        [name]: value,
      });
    };
    // console.log(formValues)

    const handleSubmit = (e) => {
        e.preventDefault();
        const configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({...updateUser})
        };
        fetch(`/api/users/${currentUser.id}`, configObj)
          .then((res) => res.json())
          .then((data) => {
            setCurrentUser(data)
           
          } 
        )
        setUpdateUser(updateUser);
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
                            value={updateUser.first_name}
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
                            value={updateUser.last_name}
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
                        value={updateUser.username}
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
                        value={updateUser.profile_pic}
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
                        value={updateUser.handicap}
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
                        value={updateUser.city}
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
                        value={updateUser.state}
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

export default MyAccount