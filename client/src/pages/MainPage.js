import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Rounds from "../components/Rounds";
import AddRound from "../components/AddRound";



function MainPage ({loggedUser}) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (loggedUser) {
      setPosts(loggedUser.rounds)
    }
  }, [loggedUser]);
  
  // callback functions for posts CRUD
  const addPost = (newPost) => setPosts(posts => [...posts, newPost])

  const deletePost = (id) => setPosts(current => current.filter(p => p.id !== id)) 

  const updatePost = (updatedPost) => setPosts(current => {
    return current.map(post => {
     if(post.id === updatedPost.id){
       return updatedPost
     } else {
       return post
     }
    })
  })

  console.log(posts)

  

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
        <AddRound loggedUser={loggedUser} addPost={addPost}/>
          <Box textAlign="center" marginTop="1rem">
          {posts?.map((post) =>( 
                    <Rounds key={post.id} post={post} deletePost={deletePost} currentUser={loggedUser} updatePost={updatePost}/>
                ))}
          </Box>
        </Box>
      </Box>


    )


}

export default MainPage;