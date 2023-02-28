import { Typography, useTheme } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser, fetchUser } from "../slices/userSlice";
import {
  selectGolfBuddies,
  addGolfBuddy,
  deleteGolfBuddy,
} from "../slices/golfBuddiesSlice";
import { useEffect } from "react";

function FriendsSearch1({ user }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectLoggedUser);
  const golfBuddies = useSelector(selectGolfBuddies);
  const [searchDisabled, setSearchDisabled] = useState(false);
  const [friendDisabled, setFriendDisabled] = useState(
    loggedUser.friends?.some((friend) => friend.id === user.id)
  );


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const friendIdsArray = [];
  loggedUser.friends?.map((friend) => {
    return friendIdsArray.push(friend.id);
  });

  const handleDeleteFriend = () => {
    const golfBuddyToDelete = golfBuddies.data?.find((golfBuddy) => {
      if (
        golfBuddy.user_id === loggedUser.id &&
        golfBuddy.friend_id === user.id
      ) {
        return golfBuddy.id;
      } else return undefined;
    });
    dispatch(deleteGolfBuddy(golfBuddyToDelete.id));
    setSearchDisabled((currentState) => !currentState);
    setFriendDisabled((currentState) => !currentState);
  };

  const handleAddFriend = async () => {
    try {
      await dispatch(
        addGolfBuddy({ user_id: loggedUser.id, friend_id: user.id })
      );
      setFriendDisabled((currentState) => !currentState);
    } catch (error) {
      console.error(error);
      // handle error here
    }
  };

  return (
    <Box key={user.id} margin="1rem 0">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Grid container>
            <Link to={`/profile/${user.id}`}>
              <Grid item sx={{ paddingRight: "1px" }}>
                <img src={user.profile_pic} 
                style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%"
                }}
                alt="avatar" />
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
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography
                      sx={{ fontSize: "13px", mr: "6px", color: "#555" }}
                    >
                      {user.username}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            disabled={searchDisabled}
            onClick={friendDisabled ? handleDeleteFriend : handleAddFriend}
            size="small"
            sx={{
              borderRadius: theme.shape.borderRadius,
              textTransform: "capitalize",
              ml: "12px",
              "&:hover": {
                background: "#333",
              },
            }}
            variant="contained"
            color={friendDisabled ? "error" : "success"}
          >
            {friendIdsArray.includes(user.id) ? "Unfriend" : "Friend"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FriendsSearch1;
