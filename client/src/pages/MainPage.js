import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import FriendsList from "../components/FriendsList";
import Rounds from "../components/Rounds";
import AddRound from "../components/AddRound";



function MainPage () {

    return (
        <Box>
        <Box borderBottom="1px solid #ccc" padding="20px 20px">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">Home</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box height="92vh" sx={{ overflowY: "scroll" }}>
        <AddRound />
          <Box textAlign="center" marginTop="1rem">
           <Rounds />
           <Rounds />
           <Rounds />
          </Box>
        </Box>
      </Box>


    )


}

export default MainPage;