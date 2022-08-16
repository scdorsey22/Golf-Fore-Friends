import React, { useEffect } from "react";
import { Box } from "@mui/system";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import DateRangeIcon from "@mui/icons-material/DateRange";

import Rounds from "../components/Rounds";



import { Link as RouteLink } from "react-router-dom";


 function Profile() {
    const theme = useTheme();
    

    return (

        <Box>
        <Box borderBottom="1px solid #ccc" padding="8px 20px">
          <Grid container alignItems="center">
            <Grid item sx={{ mr: "10px" }}>
              <RouteLink to="/">
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </RouteLink>
            </Grid>
  
           
              <Grid item>
                <Typography variant="h6">
                  Name
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "#555" }}>
                  Posts
                </Typography>{" "}
              </Grid>
          
          </Grid>
        </Box>
      
          <Box height="90vh" sx={{ overflowY: "scroll" }}>
            <Box position="relative">
              <img
                width="100%"
                height='10%'
                src='https://static7.depositphotos.com/1117454/698/i/600/depositphotos_6986182-stock-photo-golf.jpg'
                alt="background"
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 350,
                  left: 15,
                  background: "#eee",
                  borderRadius: "50%",
                }}
              >
                <img width="150px" src='https://iconape.com/wp-content/png_logo_vector/avatar-4.png' alt="profile" />
              </Box>
            </Box>
            <Box textAlign="right" padding="10px 20px">
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
              <IconButton>
                <MailOutlineIcon />
              </IconButton>
        
                <Button
                  
                  size="small"
                  sx={{
                    borderRadius: theme.shape.borderRadius,
                    textTransform: "capitalize",
                    padding: "6px 20px",
                    background: "black",
                    "&:hover": {
                      background: "#333",
                    },
                  }}
                  variant="contained"
                >
                  Friend
                </Button>
              
                <Button
                  
                  size="small"
                  sx={{
                    borderRadius: theme.shape.borderRadius,
                    textTransform: "capitalize",
                    padding: "6px 20px",
                    background: "black",
                    "&:hover": {
                      background: "#333",
                    },
                  }}
                  variant="contained"
                >
                  Unfriend
                </Button>
            </Box>
            <Box padding="10px 20px">
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
               Name
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#555" }}>
                @username
              </Typography>
              <Typography fontSize="16px" color="#333" padding="10px 0">
                Bio
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                padding="6px 0"
                flexWrap="wrap"
              >
                <Box display="flex">
                  <LocationOnIcon htmlColor="#555" />
                  <Typography sx={{ ml: "6px", color: "#555" }}>
                    Location
                  </Typography>
                </Box>
              </Box>
              
            </Box>
            <Box borderBottom="1px solid #ccc">
              <Typography
                display="inline-block"
                variant="caption"
                fontSize="16px"
                marginX="1rem"
                padding="6px 0"
                fontWeight="500"
                borderBottom={`4px solid ${theme.palette.primary.main}`}
              >
                Upcoming Rounds
              </Typography>
            </Box>
            
            <Rounds/>
            <Rounds />
            <Rounds />
              
          </Box>

      </Box>
        
    )
 }

 export default Profile