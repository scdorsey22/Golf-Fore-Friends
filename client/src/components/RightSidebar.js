import { Search } from "@mui/icons-material";
import { Input, Typography, Grid, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import FriendsSearch from "./FriendSearch";


function RightSidebar() {


return (
    <Box sx={{ height: "100%" }}>
      <Box paddingTop="10px">
        <Box
          width="100%"
          borderRadius="28px"
          border="1px solid #eee"
          position="relative"
          sx={{
            background: "#eee",
          }}
        >
          <Input
            type="text"
            inputProps={{
              style: { padding: "10px" },
            }}
            disableUnderline
            fullWidth
            placeholder="Search"
            startAdornment={
              <Search
                sx={{
                  paddingLeft: "20px",
                  color: "#777",
                }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            background: "#eee",
            borderRadius: "28px",
            padding: "10px 20px",
            margin: "1rem 0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Friends Search
          </Typography>
    
            <FriendsSearch />
            <FriendsSearch />
  
        </Box>
      </Box>
    </Box>
  );
}

export default RightSidebar;