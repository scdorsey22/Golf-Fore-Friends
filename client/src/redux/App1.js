// Import dependencies
import React, { useEffect } from "react";
import '../App.css';
import { Route, Switch} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchAllUsers, selectLoggedUser} from "./slices/userSlice";
import { fetchRounds, selectRounds } from "./slices/roundsSlice";
import { fetchGolfBuddies, selectGolfBuddies } from "./slices/golfBuddiesSlice";
import { fetchComments, selectComments } from "./slices/commentsSlice";

// Import components
import MainPage1 from "./redux_pages/MainPage1";
import GolfBuddies1 from "./redux_pages/GolfBuddies1";
import Profile1 from "./redux_pages/Profile1";
import MyAccount1 from "./redux_pages/MyAccount1";
import Layout1 from "./redux_components/Layout1";

//Import MaterialUI for loading
import { Box, LinearProgress } from "@mui/material";

//Import Auth
import LoginPage1 from "./redux_auth/LoginPage1";
import RegisterPage1 from "./redux_auth/RegisterPage1";
import ForgotPasswordPage1 from "./redux_auth/ForgotPasswordPage1";
import ResetPasswordPage1 from "./redux_auth/ResetPasswordPage1";



// Define functional component "App1"
export default function App1() {
  // Define useDispatch hook
  const dispatch = useDispatch();

  // Call the useEffect hook to dispatch actions to fetch user, rounds and golfBuddies data
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchAllUsers());
    dispatch(fetchRounds());
    dispatch(fetchGolfBuddies());
    dispatch(fetchComments());
    
  
  }, [dispatch]);


  // Use useSelector hook to select user, rounds and golfBuddies data
  const loggedUser = useSelector(selectLoggedUser);
  const rounds = useSelector(selectRounds);
  const golfBuddies = useSelector(selectGolfBuddies);
  const comments = useSelector(selectComments)
  const isLoggedIn = loggedUser && !loggedUser.error;


  // Handle cases when data is still loading
  if ( rounds.loading || golfBuddies.loading || comments.loading) {
    return <Box sx={{width: '100%'}}>
            <LinearProgress color="success"/>
           </Box>;
  }

  // If user is logged in, display appropriate pages
  return (
    
    <div className="App">
      { !isLoggedIn ? (
        <Switch>
          <Route exact path="/login">
            <LoginPage1 />
          </Route>
          <Route exact path="/">
            <LoginPage1 />
          </Route>
          <Route path="/register">
            <RegisterPage1 />
          </Route>
          <Route path="/forgot_password">
            <ForgotPasswordPage1 />
          </Route>
          <Route path="/reset_password">
            <ResetPasswordPage1 />
          </Route>
          <Route path="*">
            <h2>404 Error Not Found</h2>
          </Route>
        </Switch>
      ) : (
        <Layout1 >
          <Switch>
              <Route exact path="/">
                <MainPage1 />
              </Route>
              <Route exact path="/friends">
                <GolfBuddies1 />
              </Route>
              <Route exact path="/myaccount">
                <MyAccount1 />
              </Route>
              <Route exact path="/profile/:id">
                <Profile1 loggedUser={loggedUser}/>
              </Route>
            <Route exact path="*">
              <h2>404 Error Not Found</h2>
            </Route>
          </Switch>
        </Layout1>
      )}
    </div>
  )
}

