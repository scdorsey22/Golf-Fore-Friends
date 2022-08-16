import React, { useEffect, useState } from 'react'
import Stack from "@mui/material/Stack";
import { Paper, Grid, Item, Button, Avatar } from "@mui/material"
import { styled } from "@mui/material/styles";

function FriendsList () {

    return (
        <>
            <Stack 
                direction="column"
                alignItems="stretch"
                justifyContent="center"
                spacing={2}
                width="75%"
                marginLeft="5%"
                >
                <Grid container>
                    <Grid item>
                        <Avatar alt="Profile pic" sx={{ width: "80px", height: "80px" }}/>
                    </Grid>
                    <Grid item sx={{ flexGrow: 1 }}>
                        <h2>Friend</h2>
                        <h4>@Username</h4>
                    </Grid>
                    <Grid item marginLeft="10%">
                        <Button variant="contained" sx={ { borderRadius: 28, mr: 2, backgroundColor: "#33691e" } } to="/messaging">Message</Button>
                        <Button variant="contained" sx={ { borderRadius: 28, backgroundColor: "#33691e" } }>Unfriend</Button>
                    </Grid>
                </Grid>
                
               
            </Stack>
        </>
      )

}

export default FriendsList;