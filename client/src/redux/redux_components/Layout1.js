import { Box, Grid, Hidden } from "@mui/material";
import { useTheme } from "@mui/material";

import LeftSidebar1 from "./LeftSidebar1";
import RightSidebar1 from "./RightSidebar1";

function Layout1 ({ children, loggedUser, user, golfBuddies}) {
    const theme = useTheme();


    return (
        <Box
      sx={{
        maxWidth: theme.breakpoints.values.lg,
        margin: "0 auto",
      }}
    >
      <Grid container>
        <Grid item xs={1} lg={2}>
          <LeftSidebar1 />
        </Grid>
        <Grid item xs={11} lg={10}>
          <Grid container>
            <Grid item xs={12} lg={8}>
              <Box
                sx={{
                  height: "100vh",
                  margin: "0 1rem",
                  borderLeft: "1px solid #ccc",
                  borderRight: "1px solid #ccc",
                }}
              >
                  { children }
              </Box>
            </Grid>
            <Hidden lgDown>
              <Grid item lg={4} sx={{ height: "100vh" }}>
                <RightSidebar1 user={user} loggedUser={loggedUser} golfBuddies={golfBuddies}/>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </Grid>
    </Box>

    )
}

export default Layout1;