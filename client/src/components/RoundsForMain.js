import {
    Grid,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Input,
  } from "@mui/material";
  import { useState } from "react";
  import { Box } from "@mui/system";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import { Link } from "react-router-dom";
  import { useEffect } from "react";

  import Modal from "./Modal";

  const defaultValues = {
    user_id: undefined,
    round_id: undefined,
    comment: "",
  }

  
  export default function RoundsForMain({ user, post, deletePost, updatePost, loggedUser }) {

  const [commentText, setCommentText] = useState("");
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
    user_id: loggedUser.id,
  })
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const { description, date, course} = post
  const {first_name, last_name, username, profile_pic} = user

  
  
  //DELETE
  function handleDeleteRound () {
    // make a delete fetch request and update the backend as well as the post state
    fetch(`/rounds/${post.id}`, {
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

  const [openModal, setOpenModal] = useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const [round, setRound] =useState([])

 

  useEffect(() => {
    fetch(`/rounds/${post.id}`).then((r) => {
      if (r.ok) {
        r.json().then((res) => {
          setRound(res);
        });
      } 
    });
  }, []);

 

  const {comments} = round

  


  // const addComment = (newComment) => setCommentText(posts => [...posts, newPost])

  const handleSubmit = () => {
  
    const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ comment: commentText, user_id: loggedUser.id, round_id: post.id}),
      };
      fetch("/comments", configObj)
      .then(res => res.json())
      // .then((newComment) => addComment(newComment))
      setCommentText("");
}

 console.log(post)
    
    
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
                  <img src={post.user.profile_pic} alt="lgoog" width="50px" />
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
                          {post.user.first_name} {post.user.last_name}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                        >
                          @{post.user.username}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                        >
                          {post.created_at}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                    {post.user.id === loggedUser.id && (
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
                        <MenuItem onClick={(e) => handleDeleteRound(e)}>
                          Delete Post
                        </MenuItem>
                      </Menu>
                    </Grid>
                  </Grid>
                  <Box display="flex" padding="1rem 0">
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleModalOpen();
                    }}
                      size="small"
                    >
                      <ChatBubbleOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Link>
        {openModal && (
        <Modal
          open={openModal}
          handleClose={handleModalClose}
          saveText={"Comment"}
          len={commentText.trimStart().length}
          comments={comments}
          handleSave={handleSubmit}
          loggedUser={loggedUser}
        >
          <Box>
            <Grid container>
              <Grid item>
                <img src={loggedUser.profile_pic} alt="logo" width="60px" />
              </Grid>
              <Grid item flexGrow="1">
                <Box padding=".5rem 0" marginLeft="1rem">
                  <Input
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="Post your comment"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        )}
      </>
    );
  }
 
  