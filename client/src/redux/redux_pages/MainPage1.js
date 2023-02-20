import React, { useEffect } from "react";
import { useMemo } from "react";

import { Grid, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";

import { Link as RouterLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectRounds, addPost, deletePost, updatePost } from '../slices/roundsSlice';
import { selectUser } from "../slices/userSlice";

import RoundsForMain1 from "../redux_components/RoundsForMain1";
import AddRound1 from "../redux_components/AddRound1";

function MainPage1 () {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const rounds = useSelector(selectRounds);
 
  function handleAddPost(newPost) {
    dispatch(addPost(newPost));
  }

  function handleDeletePost(id) {
    dispatch(deletePost(id));
  }

  function handleUpdatePost(updatedPost) {
    dispatch(updatePost(updatedPost));
  }

console.log(rounds.data)

function friendsPosts() {
  let idsArray = []
  const pluck = (arr, key) => arr.map(i => i[key]);
  const friendIds = pluck(user.data.friends, 'id')
  idsArray = [...friendIds, user.data.id]

  const postsArray = []
  for ( let i = 0; i < idsArray.length; i++ ) {
    const eachPostsArray = rounds.data.filter(round => round.user.id === idsArray[i])
    postsArray.push(eachPostsArray)
  }
  return postsArray.flat()
}

console.log(user.data)


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
        <AddRound1 loggedUser={user.data} addPost={handleAddPost}/>
        <Box textAlign="center" marginTop="1rem">
        {user.data.friends.length > 0 ? friendsPosts().sort((a, b) => b.id - a.id)
          ?.map(post => (
                    <RoundsForMain1 key={post.id} post={post} deletePost={handleDeletePost} user={user.data} loggedUser={user.data} updatePost={handleUpdatePost}/>
                ))
                : 
          <Box container style={{ display: "inline-block" }}>
              <Link component={RouterLink} to="/friends">Add some friends to see when they are playing!</Link>
            </Box>
          }
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage1;
