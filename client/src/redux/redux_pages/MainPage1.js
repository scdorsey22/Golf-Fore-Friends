import React, { useState, useEffect } from "react";
import { Grid, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import { ConstructionOutlined } from "@mui/icons-material";
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRounds, selectRounds } from '../features/roundsSlice';
import Rounds from "../components/Rounds";
import RoundsForMain from "../components/RoundsForMain";
import AddRound from "../components/AddRound";

function MainPage ({loggedUser}) {
  const dispatch = useDispatch();
  const { data: rounds, loading } = useSelector(selectRounds);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(fetchRounds());
  }, [dispatch]);

  function handleAddPost(newPost) {
    dispatch(addPost(newPost));
  }

  function handleDeletePost(id) {
    dispatch(deletePost(id));
  }

  function handleUpdatePost(updatedPost) {
    dispatch(updatePost(updatedPost));
  }

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="20px 20px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Home</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: "scroll" }}>
        <AddRound loggedUser={loggedUser} addPost={handleAddPost}/>
        <Box textAlign="center" marginTop="1rem">
          {loading && <p>Loading...</p>}
          {!loading && rounds.length > 0 ? rounds
            .filter(post => post.user.id === loggedUser.id || loggedUser.friends.some(friend => friend.id === post.user.id))
            .sort((a, b) => b.id - a.id)
            .map(post => (
              <RoundsForMain key={post.id} post={post} deletePost={handleDeletePost} user={loggedUser} loggedUser={loggedUser} updatePost={handleUpdatePost}/>
            )) :
            <Box container style={{ display: "inline-block" }}>
              <Link component={RouterLink} to="/friends">Add some friends to see when they are playing!</Link>
            </Box>
          }
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;
