import React, { useState, useEffect } from "react";
import { Grid, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import Rounds from "../components/Rounds";
import RoundsForMain from "../components/RoundsForMain";
import AddRound from "../components/AddRound";
import { ConstructionOutlined } from "@mui/icons-material";
import { Link as RouterLink } from 'react-router-dom';



function MainPage ({loggedUser}) {
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (loggedUser) {
      setPosts(loggedUser.rounds)
    }
  }, [loggedUser]);

  useEffect(() => {
    fetch("/api/rounds")
    .then(res => {
      if(res.ok){
          res.json().then(posts => {
              setAllPosts(posts)
          })
      } else {
          res.json().then(json => setErrors(Object.entries(json.errors)))
      }
  })
  }, []);

  function friendsPosts() {
    let idsArray = []
    const pluck = (arr, key) => arr.map(i => i[key]);
    const friendIds = pluck(loggedUser.friends, 'id')
    idsArray = [...friendIds, loggedUser.id]

    const postsArray = []
    for ( let i = 0; i < idsArray.length; i++ ) {
      const eachPostsArray = allPosts.filter(post => post.user.id === idsArray[i])
      postsArray.push(eachPostsArray)
    }
    return postsArray.flat()
  }

console.log(allPosts)
  
  
  // callback functions for posts CRUD
  const addPost = (newPost) => setAllPosts(AllPosts => [...AllPosts, newPost])

  const deletePost = (id) => setAllPosts(current => current.filter(p => p.id !== id)) 

  const updatePost = (updatedPost) => setPosts(current => {
    return current.map(post => {
     if(post.id === updatedPost.id){
       return updatedPost
     } else {
       return post
     }
    })
  })

  

  

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
          {loggedUser.friends.length > 0 ? friendsPosts().sort((a, b) => b.id - a.id)
          ?.map(post => (
                    <RoundsForMain key={post.id} post={post} deletePost={deletePost} user={loggedUser} loggedUser={loggedUser} updatePost={updatePost}/>
                ))
                : 
          <Box container style={{ display: "inline-block" }}>
            <Link component={RouterLink} to="/friends">Add some friends to see when they are playing!</Link>
          </Box>
        
              }
          </Box>
        </Box>
      </Box>


    )


}

export default MainPage;