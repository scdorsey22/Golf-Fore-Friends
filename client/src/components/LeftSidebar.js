import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import {
  Button,
  Hidden,
  useTheme,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, NavLink } from "react-router-dom";

function LeftSidebar({loggedUser, onLogOut}) {
    const theme = useTheme();

    return (
        <>
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
                <HomeIcon fontSize="medium" color="action" />
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
                <PersonIcon fontSize="medium" color="action" />
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
              <FavoriteIcon fontSize="medium" color="action" />
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
              <ManageAccountsIcon fontSize="medium" color="action" />
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
            onClick={onLogOut}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="medium" color="action" />
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
          {/* <NavLink  
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
              padding: '0px'
            }}>
        <Hidden lgDown>
          <Button
            variant="contained"
            color="success"
            fullWidth
            style={{
              borderRadius: "28px",
              padding: "10px",
              textTransform: "capitalize",
            }}
          >
            Post
          </Button>
        </Hidden>
        </NavLink> */}
      </Box>
        </>
    )
}

export default LeftSidebar;