import {
    Grid,
    IconButton,
    Typography,
    Menu,
    MenuItem,
  } from "@mui/material";
  import { useState } from "react";
  import { Box } from "@mui/system";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import { Link } from "react-router-dom";
  import { useHistory, useParams } from "react-router";

  export default function RoundDetails1({ currentUser, post, deletePost, updatePost }) {

    const [commentText, setCommentText] = useState("");
    const { id } = useParams();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const openIcon = Boolean(anchorEl);
    
  
  const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  };
  const handleCloseIcon = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //edit button
  const [editPostValues, setEditPostValues] = useState({
    description: post.description, 
    image: post.course,
    like: post.date,
    user_id: currentUser.id,
  })
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const { description, date, course } = post
  const {first_name, last_name, username, profile_pic} = currentUser
  
  //DELETE
  function handleDeleteRound () {
    // make a delete fetch request and update the backend as well as the post state
    fetch(`/api/rounds/${post.id}`, {
      method: 'DELETE'
    })
    deletePost(post.id)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPostValues({
        ...editPostValues,
        [name]: value
    })
  }

  // const handleEditSubmit = (e) => {
  //   e.preventDefault()
  //   const configObj = {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json",
  //     },
  //     body: JSON.stringify({ ...editPostValues}),
  //   };
  //   fetch(`/meow_posts/${post.id}`, configObj)
  //   .then(resp => resp.json())
  //   .then(updatedPost => {
  //     setEditPostValues(updatedPost)
  //     updatePost(updatedPost)
  //     setEditOpen(false)
  //   })
  // }
    
    
    return (
      <>
      <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container alignItems="center">
          <Grid item sx={{ mr: "10px" }}>
            <IconButton onClick={() => history.push("/")}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6">Post</Typography>
          </Grid>
        </Grid>
      </Box>
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
                  <img src={profile_pic} alt="lgoog" width="50px" />
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
                          {first_name} {last_name}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                        >
                          @{username}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
            
                        <IconButton
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(e);
                        }}
                          
                        >
                          <MoreHorizIcon />
                        </IconButton>
                
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
                        <MenuItem onClick={(e) => handleDeleteRound(e)}>
                          Delete Post
                        </MenuItem>
                      </Menu>
                    </Grid>
                  </Grid>
                  <Box>
                    <Typography sx={{ fontSize: "20px" }}>
                      {description}
                    </Typography>
                  </Box>
                    <Box display="flex" padding="1rem 0" borderBottom="1px solid #ccc">
                    <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                      {date}
                    </Typography>
                    <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                      .
                    </Typography>
                    <Typography sx={{ fontSize: "14px", mr: "6px", color: "#555" }}>
                      {course}
                    </Typography>
                  </Box>
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
        </Box>
        
      </>
    );
  }
 