import {
    Grid,
    IconButton,
    Typography,
    Menu,
    MenuItem,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import { Link } from "react-router-dom";


  
  export default function Rounds() {
    
  
    
    return (
      <>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box
            padding="1rem"
            sx={{
              "&:hover": {
                backgroundColor: "#eee",
              },
            }}
          >
            <Grid container flexWrap="nowrap">
              <Grid item sx={{ paddingRight: "1rem" }}>
                <Link to='/'>
                  <img src='https://iconape.com/wp-content/png_logo_vector/avatar-4.png' alt="lgoog" width="50px" />
                </Link>
              </Grid>
              <Grid item flexGrow="1">
                <Box>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="nowrap"
                  >
                    <Grid item>
                      <Box display="flex">
                        <Typography
                          sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                        >
                          Golfer Name
                        </Typography>
                        <Typography
                          sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                        >
                          @GolferHandle
                        </Typography>
                        <Typography
                          sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                        >
                          .
                        </Typography>
                        <Typography
                          sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                        >
                          Round Date
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "15px", color: "#555" }}>
                          Text
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
            
                        <IconButton
                          
                        >
                          <MoreHorizIcon />
                        </IconButton>
                
                      <Menu
                        id="basic-menu"
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem >
                          Delete Post
                        </MenuItem>
                      </Menu>
                    </Grid>
                  </Grid>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    marginRight="5rem"
                    marginTop=".8rem"
                  >
                    <IconButton
                      size="small"
                    >
                      <ChatBubbleOutlineIcon fontSize="small" />
                    </IconButton>
                
                    <IconButton  size="small">
                      
                        <FavoriteIcon fontSize="small" />
                
                    </IconButton>
                    
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Link>
        
      </>
    );
  }
 
  