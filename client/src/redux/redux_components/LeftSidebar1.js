import React from "react";
import { Grid, Box, List, ListItem, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import {Home, Person, ManageAccounts, Logout, Favorite } from "@mui/icons-material";
import { Hidden, useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

import {useHistory} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedUser, logOut } from '../slices/userSlice';

function LeftSidebar1() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const loggedUser = useSelector(selectLoggedUser);
    const history = useHistory();
    const isSmallerScreen = useMediaQuery(theme.breakpoints.down("lg"));

    async function handleLogOut(e) {
      e.preventDefault();
      try {
        const resultAction = await dispatch(logOut());
        if (logOut.fulfilled.match(resultAction)) {
          history.push("/login");
      
        }
      } catch (err) {
        console.error(err);
      }
    }
    
    return (
        <>
          {isSmallerScreen ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#fff",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <Home fontSize="medium" color="action" />
          </Link>
          <NavLink
            to={`/profile/${loggedUser.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <Person fontSize="medium" color="action" />
          </NavLink>
          <NavLink
            to="/friends"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <Favorite fontSize="medium" color="action" />
          </NavLink>
          <NavLink
            to="/myaccount"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ManageAccounts fontSize="medium" color="action" />
          </NavLink>
          <Box
            component="button"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              color: "#666",
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
            onClick={handleLogOut}
          >
            <Logout fontSize="medium" color="action" />
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "10px",
                  color: theme.palette.action.active,
                }}
                primary="Logout"
              />
            </Hidden>
          </Box>
        </Box>
      ) : (
      <Box sx={{ height: "100vh", maxWidth: "100%" }}>
        <Box textAlign="center" padding="15px">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/1800/1800934.png" alt="logo" width="100px" />
          </Link>
        </Box>
        <Grid container direction="column" justifyContent="space-between" height="100%">
        <Grid item>
        <List>
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <Home fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: theme.palette.action.active,
                  }}
                  primary="Home"
                />
              </Hidden>
            </ListItem>
            </NavLink>
            <NavLink
            to={`/profile/${loggedUser.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <Person fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: theme.palette.action.active,
                  }}
                  primary="Profile"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <NavLink  
            to="/friends"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}>
          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <Favorite fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Friends"
              />
            </Hidden>
          </ListItem>
          </NavLink>
          <NavLink  
            to="/myaccount"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}>
          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <ManageAccounts fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Manage Account"
              />
            </Hidden>
          </ListItem>
          </NavLink>
          <ListItem
            id="basic-button"
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
            onClick={handleLogOut}
          >
            <ListItemIcon>
              <Logout fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Logout"
              />
            </Hidden>
          </ListItem>
          </List>
          </Grid>
          </Grid>
      </Box>
      )}
        </>
      )

}

export default LeftSidebar1;