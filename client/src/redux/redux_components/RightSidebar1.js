import { Search } from "@mui/icons-material";
import { Input, Typography} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import { selectAllUsers, selectUser } from "../slices/userSlice";

import FriendsSearch1 from "./FriendSearch1";


function RightSidebar1() {
    const [search, setSearch]=useState("")
    const allUsers = useSelector(selectAllUsers);
    const loggedUser = useSelector(selectUser)

    console.log(allUsers)


    function handleChange(e){
        setSearch(e.target.value)
    }

    const matchingUsers = allUsers.filter((user) =>
    user.first_name.toLowerCase().includes(search.toLowerCase())
  );

  const renderUsers = matchingUsers
    .filter((user) => user.id !== loggedUser.id)
    .slice(0, 5)
    .map((user) => (
      <FriendsSearch1
        key={user.id}
        user={user}
      />
    ));

  return (
    <Box sx={{ height: "100%", width: "105%" }}>
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
            value={search}
            onChange={handleChange}
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
          {renderUsers}
        </Box>
      </Box>
    </Box>
  );
}

export default RightSidebar1;