import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import './App.css';
import LoginPage from './auth/LoginPage'
import RegisterPage from "./auth/RegisterPage";
import MainPage from "./pages/MainPage";
import Header from "./pages/Header";

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
            <Header 
            loggedUser={loggedUser}
            onLogOut={handleLogOut}
            />
            <MainPage/>
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
            <Route exact path="*">
              <h2>404 Error Not Found</h2>
            </Route>
          </Switch>
        )}
    </div>
  );
}

export default App;
