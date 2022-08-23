import { Typography, useTheme } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";




function FriendsSearch({user, loggedUser}) {
  const { id } = useParams();
    const theme = useTheme();
    const [searchDisabled, setSearchDisabled] = useState(false)
    const [friendDisabled, setFriendDisabled] = useState(false)



  return (
    <Box key={user.id} margin="1rem 0">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Grid container>
            <Link to={`/profile/${user.id}`}>
              <Grid item sx={{ paddingRight: "1px" }}>
                <img src={user.profile_pic} width="50px" alt="avatar" />
              </Grid>
            </Link>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography
                      sx={{ fontSize: "14px", mr: "6px", color: "#555" }}
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
            disabled={friendDisabled}
            onClick={function handleAddFriend(){
                fetch(`/api/golf_buddies`, {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({user_id: loggedUser.id, friend_id: user.id}),
                })
                setFriendDisabled(currentState => !currentState)
            }}
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
            color="success"
          >
            {friendDisabled ? "Added" : "Friend"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FriendsSearch;