import { useState } from "react";
import { Button, Grid, TextField, InputLabel, Box, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { addPost } from "../slices/roundsSlice";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import { MenuItem, Select } from "@mui/material";

const defaultValues = {
  user_id: undefined,
  course: "",
  date: Date(),
  description: "",
};

export default function AddRound1({ loggedUser, setPosts }) {
  const theme = useTheme();
  const [postValues, setPostValues] = useState(defaultValues);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostValues({
      ...postValues,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setPostValues({
      ...postValues,
      date
    })
  }

  const handleNumGolfersChange = (e) => {
    setPostValues({
      ...postValues,
      description: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      ...postValues,
      user_id: loggedUser.id,
      date: postValues.date.toISOString(),
      description: postValues.description.toString()
    };
    dispatch(addPost(newPost));
    setPostValues(defaultValues);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
          <Grid container>
            <Grid item sx={{ paddingRight: "1rem" }}>
              <img
                src={loggedUser.profile_pic}
                alt="lgogo"
                width="50px"
                style ={{borderRadius: "50%"}}
              />
            </Grid>
            <Grid item flexGrow="1">
            <Grid container>
              <Grid item xs={12} md={6} sx={{ paddingRight: { md: "1rem" } }}>
                <Box padding=".5rem 0">
                <InputLabel>When are you playing?</InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          multiline
                          rows="1"
                      
                          type="text"
                          sx={{ width: "100%" }}
                        />
                      )}
                      value={postValues.date}
                      onChange={handleDateChange}
                      disablePast
                      required
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{ paddingLeft: { md: "1rem" } }}>
                <Box padding=".5rem 0" >
                <InputLabel>How Many Golfers Do You Need?</InputLabel>
                  <Select
                    labelId="description"
                    id="description"
                    value={postValues.description}
                    onChange={handleNumGolfersChange}
                    sx={{ width: "100%" }}
                    name="description"
                  >
                    <MenuItem value={1}>1 golfer</MenuItem>
                    <MenuItem value={2}>2 golfers</MenuItem>
                    <MenuItem value={3}>3 golfers</MenuItem>
                  </Select>
                </Box>
              </Grid>
            </Grid>
              <Box padding=".8rem 0">
                <TextField
                  multiline
                  rows="1"
                 
                  type="text"
                  placeholder="What Golf Course?"
                  sx={{ width: "100%" }}
                  name="course"
                  value={postValues.course}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box
                textAlign="right"
                paddingBottom=".5rem"
                paddingTop=".5rem"
                
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    borderRadius: theme.shape.borderRadius,
                    fontSize: "14px",
                  }}
                  type="submit"
                >
                  Post
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}
