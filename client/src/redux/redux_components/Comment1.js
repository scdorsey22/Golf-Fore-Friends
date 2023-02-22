import { Grid, IconButton, Typography, Menu, MenuItem, } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";




export default function Comment1({ comment, loggedUser }) {
    const {created_at, user_id} = comment
    const [user, setUser] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const openIcon = Boolean(anchorEl);
    const [open, setOpen] = useState(false);
  
  
  const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  };
  const handleCloseIcon = () => {
    setAnchorEl(null);
  };


    useEffect(() => {
        fetch(`/api/users/${user_id}`).then((r) => {
          if (r.ok) {
            r.json().then((res) => {
              setUser(res);
            });
          } 
        });
      }, []);

      console.log(user)


  return (
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
          <img src={user.profile_pic} alt="lgoog" width="50px" />
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
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    @{user.username}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    .
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    {created_at}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "15px", color: "#555" }}>
                    {comment.comment}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
              {comment.user_id === loggedUser.id && (
                <IconButton
                aria-expanded={open ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(e);
                }}
                >
                  <MoreHorizIcon />
                </IconButton>
              )}
                <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openIcon}
                        onClose={handleCloseIcon}
                        onClick={(e) => e.stopPropagation()}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem >
                          Delete Comment
                        </MenuItem>
                      </Menu>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}