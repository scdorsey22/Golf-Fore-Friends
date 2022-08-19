import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Rounds from "../components/Rounds";
import AddRound from "../components/AddRound";



function MainPage ({loggedUser}) {

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
        <AddRound loggedUser={loggedUser}/>
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