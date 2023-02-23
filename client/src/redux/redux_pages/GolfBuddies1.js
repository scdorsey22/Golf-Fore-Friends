
import { Grid, Box, Typography } from "@mui/material"
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FriendsList1 from "../redux_components/FriendsList1";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedUser, fetchUser} from "../slices/userSlice";




import { Link as RouteLink } from "react-router-dom";
import { useEffect } from "react";

function GolfBuddies1 () {
    const dispatch = useDispatch()
    const loggedUser = useSelector(selectLoggedUser);

    useEffect(() => {
      dispatch(fetchUser());
    }, [dispatch]);
     

    return (
        <Box>
        <Box borderBottom="1px solid #ccc" padding="20px 20px">
          <Grid container alignItems="center">
            <Grid item sx={{ mr: "10px" }}>
              <RouteLink to="/">
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </RouteLink>
            </Grid>
            <Grid item>
              <Typography variant="h6">Friends</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box height="90vh" sx={{ overflowY: "scroll" }}>
        <Grid container style={{ display: "inline-block", width: "80%", margin: "auto", justifyContent: "space-evenly" }}>
            {loggedUser.friends?.map(friend => (
            <FriendsList1 
            key={friend.id}
            friend={friend}
            />
            ))}
        </Grid>
        </Box>
        </Box>


    )
}

export default GolfBuddies1;