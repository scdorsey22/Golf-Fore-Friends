import { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material"
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FriendsList from "../components/FriendsList";


import { Link as RouteLink } from "react-router-dom";

function GolfBuddies ( {loggedUser, golfBuddies, setGolfBuddies, addGolfBuddy, deleteGolfBuddy} ) {
    
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("/api//users")
        .then(res => res.json())
        .then(setUsers)
    }, [])

   

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
              <Typography variant="h6">Friends</Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container style={{ display: "inline-block", width: "80%", margin: "auto", justifyContent: "space-evenly" }}>
            {loggedUser.friends?.map(friend => (
            <FriendsList 
            friend={friend}
            loggedUser={loggedUser} 
            golfBuddies={golfBuddies} 
            setGolfBuddies={setGolfBuddies}
            addGolfBuddy={addGolfBuddy}
            deleteGolfBuddy={deleteGolfBuddy}
            />
            ))}
        </Grid>
        </Box>


    )
}

export default GolfBuddies;