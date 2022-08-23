
import { Box } from "@mui/system";
import {
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import Rounds from "../components/Rounds";
import { Link as RouteLink } from "react-router-dom";
import { useParams } from "react-router";


 function Profile({loggedUser}) {
    const theme = useTheme();
    const [posts, setPosts] = useState([])
    const [user, setUser] =useState([])
    const { id } = useParams();

  
    useEffect(() => {
      fetch(`/api/users/${id}`)
          .then((r) => {
              if (r.ok) {
                r.json().then((res) => 
                setUser(res)
                );
              }
      });
   }, [id])

  
    useEffect(() => {
    if (user) {
      setPosts(user.rounds)
    }
  }, [user]);


 console.log(user)

    return (

        <Box>
        <Box borderBottom="1px solid #ccc" padding="8px 20px">
          <Grid container alignItems="center">
            <Grid item sx={{ mr: "10px" }}>
              <RouteLink to="/">
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </RouteLink>
            </Grid>
  
           
              <Grid item>
                <Typography variant="h6">
                  {user.first_name} {user.last_name}
                </Typography>
              </Grid>
          
          </Grid>
        </Box>
      
          <Box height="90vh" sx={{ overflowY: "scroll" }}>
            <Box position="relative">
              <img
                width="100%"
                height='10%'
                src='https://static.vecteezy.com/system/resources/thumbnails/002/381/123/small/golf-club-realistic-background-free-vector.jpg'
                alt="background"
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 200,
                  left: 30,
                  background: "#eee",
                  borderRadius: "50%",
                
                }}
              >
                <img width='150px' src={user.profile_pic} alt="profile" />
              </Box>
            </Box>
            <Box textAlign="right" padding="10px 20px">
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Box>
            <Box padding="10px 20px">
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
              {user.first_name} {user.last_name}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#555" }}>
                @{user.username}
              </Typography>
              <Typography fontSize="16px" color="#333" padding="10px 0">
                {user.handicap} HDCP
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
                    {user.city}, {user.state}
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
            {posts?.map((post) =>( 
            <Rounds key={post.id} post={post}  currentUser={user} />
            ))}
              
          </Box>

      </Box>
        
    )
 }

 export default Profile