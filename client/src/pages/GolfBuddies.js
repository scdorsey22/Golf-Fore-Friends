import { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material"
import FriendsList from "../components/FriendsList";
import FriendsSearch from "../components/FriendSearch";

function GolfBuddies () {

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
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">Friends</Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container style={{ display: "inline-block", width: "80%", margin: "auto", justifyContent: "space-evenly" }}>
            <FriendsSearch />
        </Grid>
        </Box>


    )
}

export default GolfBuddies;