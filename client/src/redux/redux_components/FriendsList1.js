import { Typography, useTheme } from "@mui/material";
import { Button, Grid, Box, Hidden } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "../slices/userSlice";
import { selectGolfBuddies, deleteGolfBuddy } from "../slices/golfBuddiesSlice";
import FriendsListSearch1 from "./FriendsListSearch1";

function FriendsList1({ friend }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectLoggedUser);
  const golfBuddies = useSelector(selectGolfBuddies);
  const [disabled, setDisabled] = useState(false);

  const handleDeleteFriend = () => {
    const golfBuddyToDelete = golfBuddies.data?.find((golfBuddy) => {
      if (
        golfBuddy.user_id === loggedUser.id &&
        golfBuddy.friend_id === friend.id
      ) {
        return golfBuddy.id;
      } else return undefined;
    });
    dispatch(deleteGolfBuddy(golfBuddyToDelete.id));
    setDisabled((currentState) => !currentState);
  };

  return (
    <Box margin="1rem 0" >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Grid container>
            <Link to={`/profile/${friend.id}`}>
              <Grid item sx={{ paddingRight: "12px" }}>
                <img src={friend.profile_pic} 
                alt="avatar" 
                style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}/>
              </Grid>
            </Link>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: "500",
                      maxWidth: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {friend.first_name} {friend.last_name}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography
                      sx={{ fontSize: "13px", mr: "6px", color: "#555" }}
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
            onClick={handleDeleteFriend}
          >
            {disabled ? "Friend Removed" : "Unfriend"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FriendsList1;
