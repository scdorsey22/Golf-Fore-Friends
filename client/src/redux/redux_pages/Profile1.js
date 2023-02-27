
import { Box, Grid, IconButton,Typography, useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import Rounds1 from "../redux_components/Rounds1";
import { Link as RouteLink } from "react-router-dom";
import { useParams } from "react-router";
import {useSelector, useDispatch} from 'react-redux'
import { selectFetchUserById, fetchUserById, selectLoggedUser } from '../slices/userSlice'
import { selectRounds, fetchRounds } from "../slices/roundsSlice";
import { selectComments, fetchComments } from "../slices/commentsSlice";


function Profile1() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id }  = useParams();
  const user = useSelector(selectFetchUserById);
  const loggedUser = useSelector(selectLoggedUser)
  const rounds = useSelector(selectRounds);
  const comments = useSelector(selectComments)

  

  useEffect(() => {
    dispatch(fetchUserById(id)); // Update dummy state to force re-render
  }, [dispatch, id]);

 
    if (!user) {
      return <div>Loading...</div>;
    }

    return (

        <Box>
        <Box borderBottom="1px solid #ccc" padding="8px 20px">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item sx={{ mr: "10px" }}>
              <RouteLink to="/">
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </RouteLink>
            </Grid>
  
           
              <Grid item>
                <Typography variant="h6">
                  {user.data.first_name} {user.data.last_name}
                </Typography>
              </Grid>
          
          </Grid>
        </Box>
      
          <Box height="90vh" sx={{ overflowY: "scroll" }}>
            <Box position="relative">
              <img
                width="100%"
                height='100%'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyrC3DKrS0GZ-_FJrsXoiIW5u4EMK-O_mZQQ&usqp=CAU'
                alt="background"
              />
              <Box
                sx={{
              position: "absolute",
              top: "25%",
              left: "10%",
              width: "30%",
              maxWidth: "150px",
            }}
              >
                <img style={{ width: "100%", height: "auto", borderRadius: "50%" }} src={user.data.profile_pic} alt="profile" />
              </Box>
            </Box>
            <Box textAlign="right" padding="10px 20px">
            {user.data.id === loggedUser.id && (
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
              )}
            </Box>
            <Box padding="10px 20px">
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
              {user.data.first_name} {user.data.last_name}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#555" }}>
                @{user.data.username}
              </Typography>
              <Typography fontSize="16px" color="#333" padding="10px 0">
                {user.data.handicap} HDCP
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                padding="6px 0"
                flexWrap="wrap"
              >
                <Box display="flex">
                  <LocationOnIcon htmlColor="#555" />
                  <Typography sx={{ ml: "6px", color: "#555" }}>
                    {user.data.city}, {user.data.state}
                  </Typography>
                </Box>
              </Box>
              
            </Box>
            <Box borderBottom="1px solid #ccc">
              <Typography
                display="inline-block"
                variant="caption"
                fontSize="16px"
                marginX="1rem"
                padding="6px 0"
                fontWeight="500"
                borderBottom={`4px solid ${theme.palette.primary.main}`}
              >
                Upcoming Rounds
              </Typography>
            </Box>
            {user.data.rounds?.map((post) =>( 
            <Rounds1 key={post.id} post={post}  user={user.data} loggedUser={loggedUser} />
            ))}
              
          </Box>

      </Box>
        
    )
 }

 export default Profile1