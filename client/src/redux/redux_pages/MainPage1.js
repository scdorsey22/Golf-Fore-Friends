import { Grid, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";

// Import Redux actions and selectors
import { selectRounds, deletePost} from '../slices/roundsSlice';
import { selectLoggedUser, fetchUser } from "../slices/userSlice";

// Import custom components
import RoundsForMain1 from "../redux_components/RoundsForMain1";
import AddRound1 from "../redux_components/AddRound1";

export default function MainPage1() {
  // Initialize Redux dispatch and selector hooks
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectLoggedUser);
  const rounds = useSelector(selectRounds);

  // Initialize state for posts
  const [posts, setPosts] = useState(friendsPosts().sort((a, b) => b.id - a.id));


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (rounds.data.length > 0) {
      setPosts(friendsPosts().sort((a, b) => b.id - a.id));
    }
  }, [rounds]);


  // Function to delete a post from the Redux store
  function handleDeletePost(postId) {
    dispatch(deletePost(postId));
    setPosts(posts.filter(post => post.id !== postId));
  }

  // // Function to update a post in the Redux store
  // function handleUpdatePost(updatedPost) {
  //   dispatch(updatePost(updatedPost));
  // }

// Function to retrieve all posts by the user's friends and the user
function friendsPosts() {
  let idsArray = [];
  const pluck = (arr, key) => arr.map(i => i[key]);
  const friendIds = pluck(loggedUser.friends, 'id')
  idsArray = [...friendIds, loggedUser.id]

  const postsArray = []
  for ( let i = 0; i < idsArray.length; i++ ) {
    const eachPostsArray = rounds.data.filter(round => round.user.id === idsArray[i])
    postsArray.push(eachPostsArray)
  }
  return postsArray.flat()
}

  return (
    // Main container for the page
    <Box sx={{ height: "100%" }}>
      <Box height="90vh" sx={{ overflowY: "scroll" }}>
        {/* Header section */}
        <Box borderBottom="1px solid #ccc" padding="20px">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h6">Home</Typography>
            </Grid>
          </Grid>
        </Box>
        {/* Main content section */}
        <Box padding="1rem" marginX="auto" maxWidth="900px">
          {/* Add post form */}
          <AddRound1 loggedUser={loggedUser} setPosts={setPosts}/>
          {/* Conditional rendering for posts */}
          <Box textAlign="center" marginTop="1rem">
          {loggedUser.friends.length > 0 ? posts
              .map(post => (
                <RoundsForMain1
                  key={post.id}
                  post={post}
                  loggedUser={loggedUser}
                  onDeletePost={handleDeletePost}
                />
              ))
              : 
              <Box container style={{ display: "inline-block" }}>
                <Link component={RouterLink} to="/friends">Add some friends to see when they are playing!</Link>
              </Box>
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}





