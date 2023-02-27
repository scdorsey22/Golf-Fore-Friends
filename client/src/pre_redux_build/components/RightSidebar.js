import { Search } from "@mui/icons-material";
import { Input, Typography} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import FriendsSearch from "./FriendSearch";


function RightSidebar({loggedUser, user, golfBuddies}) {
    const [search, setSearch]=useState("")
    const [users, setUsers] = useState([])



    useEffect(() => {
        fetch("/api/users")
        .then((r) => {
            if (r.ok) {
              r.json().then(setUsers)
            }
          });
    }, [])



    function handleChange(e){
        setSearch(e.target.value)
    }

    function allUsers(){
        
        let allUsersArray = []
        const matchingUsers = users.filter(user => {
            return user.first_name.toLowerCase().includes(search.toLowerCase())
        })


        allUsersArray = matchingUsers

        const renderUsers = allUsersArray?.map(user =>  {
          if (user.id !== loggedUser.id) {
            return <FriendsSearch 
            key={user.id} 
            user={user} 
            loggedUser={loggedUser} 
            golfBuddies={golfBuddies}
            />
          }
            })
        return renderUsers
        }



return (
    <Box sx={{ height: "100%", width: '105%'
    }}>
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
    

          {allUsers().slice(0,5)}
  
        </Box>
      </Box>
    </Box>
  );
}

export default RightSidebar;