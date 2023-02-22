import { Typography, useTheme } from "@mui/material";
import { Button, Grid, Box } from "@mui/material";
import  { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { selectGolfBuddies, deleteGolfBuddy } from "../slices/golfBuddiesSlice";


function FriendsList1 ( {friend}) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const loggedUser = useSelector(selectUser);
    const golfBuddies = useSelector(selectGolfBuddies);
    const [disabled, setDisabled] = useState(false)

    const handleDeleteFriend = () => {
        const golfBuddyToDelete = golfBuddies.data?.find(golfBuddy => {
          if ((golfBuddy.user_id === loggedUser.data.id) && (golfBuddy.friend_id === friend.id)) {
            return golfBuddy.id
          } else
            return undefined
        })
        dispatch(deleteGolfBuddy(golfBuddyToDelete.id))
        setDisabled(currentState => !currentState)
      }



    return (
            <Box margin="1rem 0">
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                    <Grid container>
                        <Link to={`/profile/${friend.id}`}>
                        <Grid item sx={{ paddingRight: "12px" }}>
                            <img src={friend.profile_pic} width="50px" alt="avatar" />
                        </Grid>
                        </Link>
                        <Grid item>
                        <Grid container alignItems="center">
                            <Grid item>
                            <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                                {friend.first_name} {friend.last_name}
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Typography
                                sx={{ fontSize: "14px", mr: "6px", color: "#555" }}
                                >
                                    {friend.username}
                                </Typography>
                            </Box>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item>
                    <Button
                        
                        size="small"
                        sx={{
                        borderRadius: theme.shape.borderRadius,
                        textTransform: "capitalize",
                        ml: "12px",
                        background: "success",
                        "&:hover": {
                            background: "#333",
                        },
                        }}
                        variant="contained"
                        color="error"
                        disabled={disabled}
                        onClick={handleDeleteFriend}>
                            {disabled ? "Friend Removed" : "Unfriend"}
                    </Button>
                    </Grid>
                </Grid>
            
    </Box>
  );
}



export default FriendsList1;