import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, selectUser } from "./slices/userSlice";
import { fetchRounds, selectRounds } from "./slices/roundsSlice";
import { fetchGolfBuddies, selectGolfBuddies } from "./slices/golfBuddiesSlice";

import LoginPage from '../auth/LoginPage'
import RegisterPage from "../auth/RegisterPage";
import MainPage from "../pages/MainPage";
import Layout from "../components/Layout";
import GolfBuddies from "../pages/GolfBuddies";
import Profile from "../pages/Profile";
import ForgotPasswordPage from '../auth/ForgotPasswordPage'
import ResetPasswordPage from "../auth/ResetPasswordPage";
import RoundDetails from "../pages/RoundDetails";
import MyAccount from "../pages/MyAccount";


function App1() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchRounds());
    dispatch(fetchGolfBuddies());
  }, [dispatch]);

  const user = useSelector(selectUser);
  const rounds = useSelector(selectRounds);
  const golfBuddies = useSelector(selectGolfBuddies);

  function handleLogOut(e) {
    fetch("/api/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        history.push("/");
        console.log('click')
      }
    });
  }

  console.log(user)

  function handleCreateOrLog(user) {
    history.push("/");
  }

  if (user.loading || rounds.loading || golfBuddies.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {user.data ? (
        <Switch>
          <Layout 
            loggedUser={user.data}
            onLogOut={handleLogOut}
            user={user}
            golfBuddies={golfBuddies.data}
          >
            <Route exact path="/">
              <MainPage loggedUser={user.data}/>
            </Route>
            <Route exact path="/friends">
              <GolfBuddies 
                loggedUser={user.data}
                golfBuddies={golfBuddies.data}
              />
            </Route>
            <Route exact path="/myaccount">
              <MyAccount 
                currentUser={user.data}
              />
            </Route>
            <Route exact path="/profile/:id">
              <Profile 
                loggedUser={user.data}
              />
            </Route>
            <Route exact path="/rounds/:id">
              <RoundDetails loggedUser={user.data}/>
            </Route>
          </Layout>
          <Route exact path="*">
            <h2>404 Error Not Found</h2>
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/login">
            <LoginPage
              onCreateOrLog={handleCreateOrLog}
            />
          </Route>
          <Route exact path="/">
            <LoginPage
              onCreateOrLog={handleCreateOrLog}
            />
          </Route>
          <Route exact path="/regsiter">
            <RegisterPage
              onCreateOrLog={handleCreateOrLog}
            />
          </Route>
          <Route exact path="/forgot_password">
            <ForgotPasswordPage/>
          </Route>
          <Route exact path="/reset_password">
            <ResetPasswordPage
              onCreateOrLog={handleCreateOrLog}
            />
          </Route>
          <Route exact path="*">
              <h2>404 Error Not Found</h2>
            </Route>
          </Switch>
        )}
</div>
  );
}

export default App1;
