import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import './App.css';



import LoginPage from './auth/LoginPage'
import RegisterPage from "./auth/RegisterPage";
import MainPage from "./pages/MainPage";
import Layout from "./components/Layout";
import GolfBuddies from "./pages/GolfBuddies";
import Profile from "./pages/Profile";
import ForgotPasswordPage from './auth/ForgotPasswordPage'


function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [responseFromAccountOrLogged, setResponseFromAccountOrLogged] = useState(false);
  const [authorize, setAuthorize] = useState(false);

  const history = useHistory();

  useEffect(() => {
    fetch("/api/users/show").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setLoggedUser(user);
          setAuthorize(true);
        });
      } else {
        setAuthorize(true);
      }
    });
  }, []);

  function handleLogOut(e) {
    fetch("/api/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setLoggedUser(null);
        setResponseFromAccountOrLogged(false);
        history.push("/");
        console.log('click')
      }
    });
  }

  function handleCreateOrLog(user) {
    setResponseFromAccountOrLogged(true);

    setTimeout(() => {
      setLoggedUser(user);
      history.push("/");
    }, 1500);
  }

  if (!authorize) {
    return <div></div>;
  }


  return (
    <div className="App">
      {loggedUser ? (
        <Switch>
          <Route exact path="/">
            <Layout 
            loggedUser={loggedUser}
            onLogOut={handleLogOut}
            >
             <MainPage loggedUser={loggedUser}/>
            </Layout>
          </Route>
          <Route exact path="/friends">
            <Layout 
            loggedUser={loggedUser}
            onLogOut={handleLogOut}
            >
             <GolfBuddies loggedUser={loggedUser}/>
            </Layout>
          </Route>
          <Route exact path="/profile">
            <Layout 
            loggedUser={loggedUser}
            onLogOut={handleLogOut}
            >
             <Profile loggedUser={loggedUser}/>
            </Layout>
          </Route>
          <Route exact path="*">
            <h2>404 Error Not Found</h2>
          </Route>
        </Switch>
        ) : (
          <Switch>
            <Route exact path="/login">
              <LoginPage
                onCreateOrLog={handleCreateOrLog}
                responseFromAccountOrLogged={responseFromAccountOrLogged}
              />
            </Route>
            <Route exact path="/">
              <LoginPage
                onCreateOrLog={handleCreateOrLog}
                responseFromAccountOrLogged={responseFromAccountOrLogged}
              />
            </Route>
            <Route exact path="/regsiter">
              <RegisterPage
                onCreateOrLog={handleCreateOrLog}
                responseFromAccountOrLogged={responseFromAccountOrLogged}
              />
            </Route>
            <Route exact path="/forgotpassword">
              <ForgotPasswordPage/>
            </Route>
            <Route exact path="*">
              <h2>404 Error Not Found</h2>
            </Route>
          </Switch>
        )}
</div>
  );
}

export default App;
