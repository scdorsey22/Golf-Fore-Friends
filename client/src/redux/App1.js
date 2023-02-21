// Import dependencies
import React, { useEffect } from "react";
import { Route, Switch} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser, fetchAllUsers} from "./slices/userSlice";
import { fetchRounds, selectRounds } from "./slices/roundsSlice";
import { fetchGolfBuddies, selectGolfBuddies } from "./slices/golfBuddiesSlice";
import { fetchComments } from "./slices/commentsSlice";

// Import components
import MainPage1 from "../redux/redux_pages/MainPage1";
import GolfBuddies1 from "./redux_pages/GolfBuddies1";
import Profile1 from "./redux_pages/Profile1";
import MyAccount1 from "./redux_pages/MyAccount1";
import RoundDetails1 from "./redux_pages/RoundDetails1";
import Layout1 from "./redux_components/Layout1";

//Import Auth
import LoginPage1 from "../redux/redux_auth/LoginPage1";
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
    dispatch(fetchAllUsers())
    dispatch(fetchRounds());
    dispatch(fetchGolfBuddies());
  }, [dispatch]);

  // Use useSelector hook to select user, rounds and golfBuddies data
  const user = useSelector(selectUser);
  const rounds = useSelector(selectRounds);
  const golfBuddies = useSelector(selectGolfBuddies);


  // Handle cases when data is still loading
  if (user.loading || rounds.loading || golfBuddies.loading) {
    return <div>Loading...</div>;
  }

  // If user is not logged in, display login pages
  if (!user.data) {
  return (
    <Switch>
      <Route path="/login">
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
  );
}

  // If user is logged in, display appropriate pages
  return (
    <div className="App">
        <Switch>
          <Layout1 >
            <Route exact path="/">
              <MainPage1 loggedUser={user.data}/>
            </Route>
            <Route exact path="/friends">
              <GolfBuddies1 
                loggedUser={user.data}
                golfBuddies={golfBuddies.data}
              />
            </Route>
            <Route exact path="/myaccount">
              <MyAccount1 
                currentUser={user.data}
              />
            </Route>
            <Route exact path="/profile/:id">
              <Profile1
                loggedUser={user.data}
              />
            </Route>
            <Route exact path="/rounds/:id">
              <RoundDetails1 loggedUser={user.data}/>
            </Route>
          </Layout1>
          <Route exact path="*">
            <h2>404 Error Not Found</h2>
          </Route>
        </Switch>
    </div>
  )
}

