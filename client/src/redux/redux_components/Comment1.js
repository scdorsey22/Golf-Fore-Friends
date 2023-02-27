import { Grid, IconButton, Typography, Menu, MenuItem, } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { updateComment, deleteComment } from "../slices/commentsSlice";
import { useDispatch } from "react-redux";


export default function Comment1({ comment, loggedUser }) {
    const dispatch = useDispatch()
    const {created_at, user, id} = comment
    const [anchorEl, setAnchorEl] = useState(null);
    const openIcon = Boolean(anchorEl);
    const [open, setOpen] = useState(false);
  
  
  const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  };

  const handleCloseIcon = () => {
    setAnchorEl(null);
  };

    const handleDeleteComment = () => {
    dispatch(deleteComment(id));
    setAnchorEl(null);
  };

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
          <img src={user.profile_pic} alt="lgoog" 
          style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }} />
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
              {user.id === loggedUser.id && (
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
                        {/* <MenuItem>
                          Edit Comment
                        </MenuItem> */}
                        <MenuItem onClick={handleDeleteComment} >
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