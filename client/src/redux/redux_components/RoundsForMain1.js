import { Grid, IconButton, Typography, Menu, MenuItem, Input, Box } from "@mui/material";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectRounds, deletePost } from "../slices/roundsSlice";
import { addComment, selectComments } from "../slices/commentsSlice";
import moment from 'moment'

import Modal1 from "./Modal1";

const defaultValues = {
  user_id: undefined,
  round_id: undefined,
  comment: "",
};

export default function RoundsForMain1({ user, post, loggedUser }) {
  const dispatch = useDispatch();
  const rounds = useSelector(selectRounds);
  const comments = useSelector(selectComments);
  const [commentText, setCommentText] = useState("");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openMenu = Boolean(menuAnchorEl);

  // Extract the fields from the post object for easier access.
  const { description, date, course, created_at } = post;
  const { first_name, last_name, username, profile_pic, id: userId } = post.user;

  // Handler for opening the menu.
  const handleMenuOpen = (e) => {
    e.preventDefault();
    setMenuAnchorEl(e.currentTarget);
  };

  // Handler for closing the menu.
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Handler for opening the comment modal.
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // Handler for closing the comment modal.
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Handler for deleting the post.
  const handleDeletePost = () => {
    dispatch(deletePost(post.id));
  };

  // Handler for submitting a comment.
  const handleSubmitComment = () => {
    dispatch(addComment({ commentText, userId, postId: post.id }));
    setCommentText("");
  };

  const formattedCreatedAt = moment(created_at).format("MM/DD/YYYY LT");
  const formattedDate = moment(date).format("MMMM DD, YYYY [at] LT");

  // Find the round object that matches the current post and get its comments array.
  const round = rounds.data.find((round) => round.id === post.id);
  const { comments: roundComments = [] } = round || {};

  return (
    <>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
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
              <Link to="/">
                <img src={profile_pic} alt="logo" width="50px" />
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
                      <Typography sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}>
                        {first_name} {last_name}
                      </Typography>
                      <Typography sx={{ fontSize: "15px", mr: "6px", color: "#555" }}>
                        @{username}
                      </Typography>
                        <Typography
                          sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                        >
                          {formattedCreatedAt}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                    {post.user.id === loggedUser.id && (
                        <IconButton
                        // aria-expanded={open ? "true" : undefined}
                        onClick={handleMenuOpen}
                          
                        >
                          <MoreHorizIcon />
                        </IconButton>
                      )}
                      <Menu
                        id="basic-menu"
                        anchorEl={menuAnchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                        onClick={(e) => e.stopPropagation()}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={(e) => handleDeletePost(e)}>
                          Delete Post
                        </MenuItem>
                      </Menu>
                    </Grid>
                  </Grid>
                  <Box display="flex" padding="1rem 0">
                    <Typography sx={{ fontSize: "20px" }}>
                      Looking for {description} golfers to play at {course}
                    </Typography>
                  </Box>
                    <Box display="flex" padding="1rem 0" borderBottom="1px solid #ccc">
                    <Typography sx={{ fontSize: "20px", }}>
                      Tee Time on {formattedDate}
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
        {modalOpen && (
        <Modal1
          open={modalOpen}
          handleClose={handleModalClose}
          saveText={"Comment"}
          len={commentText.trimStart().length}
          comments={comments}
          handleSave={handleSubmitComment}
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
                    
                    type="text"
                    placeholder="Post your comment"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal1>
        )}
      </>
    );
  }
 
  