
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
import Rounds1 from "../redux_components/Rounds1";
import { Link as RouteLink } from "react-router-dom";
import { useParams } from "react-router";


 function Profile1({loggedUser}) {
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
                height='100%'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyrC3DKrS0GZ-_FJrsXoiIW5u4EMK-O_mZQQ&usqp=CAU'
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
            {user.id === loggedUser.id && (
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
              )}
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
            <Rounds1 key={post.id} post={post}  user={user} loggedUser={loggedUser} />
            ))}
              
          </Box>

      </Box>
        
    )
 }

 export default Profile1