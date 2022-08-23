import { useState } from "react";
import { Button, Grid, Input } from "@mui/material";
import { Box, useTheme } from "@mui/system";


const defaultValues = {
  user_id: undefined,
  course: "",
  date: "",
  description: "",
}

export default function AddRound({loggedUser, addPost}) {
 
  const theme = useTheme();
  const [postValues, setPostValues] = useState(defaultValues);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostValues({
            ...postValues,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({...postValues, user_id: loggedUser.id}),
          };
          fetch("/rounds", configObj)
          .then(res => res.json())
          .then((newPost) => addPost(newPost))
        setPostValues(defaultValues);
    }


  
  return (
    <>
    <form onSubmit={handleSubmit}>
    <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
      <Grid container>
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img src={loggedUser.profile_pic} alt="lgogo" width="50px" />
        </Grid>
        <Grid item flexGrow="1">
          <Box padding=".5rem 0">
            <Input
              
              multiline
              rows="2"
              disableUnderline
              type="text"
              placeholder="Round Date?"
              sx={{ width: "100%" }}
              name="date"
              value={postValues.date}
              onChange={handleChange}
            />
          </Box>
          <Box padding=".5rem 0">
            <Input
              
              multiline
              rows="2"
              disableUnderline
              type="text"
              placeholder="Course?"
              sx={{ width: "100%" }}
              name="course"
              value={postValues.course}
              onChange={handleChange}
            />
          </Box>
          <Box padding=".5rem 0">
            <Input
              
              multiline
              rows="2"
              disableUnderline
              type="text"
              placeholder="How many golfer do you need?"
              sx={{ width: "100%" }}
              name="description"
              value={postValues.description}
              onChange={handleChange}
            />
          </Box>
          <Box
            textAlign="right"
            paddingBottom=".5rem"
            paddingTop=".5rem"
            borderTop="1px solid #ccc"
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                borderRadius: theme.shape.borderRadius,
                fontSize: "12px",
              }}
              onClick={handleSubmit}
            >
              Post
            </Button >
          </Box>
        </Grid>
      </Grid>
    </Box>
    </form>
    </>
  );
}