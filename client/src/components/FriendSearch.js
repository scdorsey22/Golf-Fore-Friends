import { Typography, useTheme } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";



function FriendsSearch() {
  const theme = useTheme();
  

  return (
    <Box margin="1rem 0">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Grid container>
            <Link to='/'>
              <Grid item sx={{ paddingRight: "12px" }}>
                <img src='https://iconape.com/wp-content/png_logo_vector/avatar-4.png' width="50px" alt="avatar" />
              </Grid>
            </Link>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                    Name
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography
                      sx={{ fontSize: "14px", mr: "6px", color: "#555" }}
                    >
                        Username
                    </Typography>
                    {/* <Typography
                      sx={{
                        fontSize: "12px",
                        background: "#ccc",
                        borderRadius: theme.shape.borderRadius,
                        padding: "0 6px",
                        color: "#777",
                      }}
                    >
                      follows you
                    </Typography> */}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            
            size="small"
            sx={{
              borderRadius: theme.shape.borderRadius,
              textTransform: "capitalize",
              ml: "12px",
              background: "success",
              "&:hover": {
                background: "#333",
              },
            }}
            variant="contained"
            color="success"
          >
            Add Friend
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FriendsSearch;