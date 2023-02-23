import { Box, Grid, Hidden } from "@mui/material";
import { useTheme } from "@mui/material";

// Import custom components
import LeftSidebar1 from "./LeftSidebar1";
import RightSidebar1 from "./RightSidebar1";

// Component for the Main Layout
export default function Layout1 ({ children }) {

    // This line uses the MUI theme to get breakpoints
    const theme = useTheme();

  
    return (
        <Box
          sx={{
            maxWidth: theme.breakpoints.values.lg,
            margin: "0 auto",
          }}
        >
          <Grid container sx={{
          flexDirection: { xs: "column-reverse", lg: "row" },
        }}>
            <Grid item xs={12} lg={2}>
              <LeftSidebar1 />
            </Grid>
            <Grid item xs={12} lg={10}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={8}>
                  <Box
                    sx={{
                      minHeight: "calc(100vh - 120px)",
                      margin: "0 1rem",
                      borderLeft: "1px solid #ccc",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                      { children }
                  </Box>
                </Grid>

                {/* This is a Hidden component that only renders on larger screens */}
                <Hidden lgDown>
                  <Grid item lg={4} sx={{ height: "100vh" }}>
                    {/* This is the RightSidebar1 component, which has the Friends Search Bar*/}
                    <RightSidebar1 />
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
        </Box>
    )
}


