import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import './App.css';
import { useParams } from "react-router-dom";

import LoginPage from './auth/LoginPage'
import RegisterPage from "./auth/RegisterPage";
import MainPage from "./pages/MainPage";
import Layout from "./components/Layout";
import GolfBuddies from "./pages/GolfBuddies";
import Profile from "./pages/Profile";
import ForgotPasswordPage from './auth/ForgotPasswordPage'
import ResetPasswordPage from "./auth/ResetPasswordPage";
import RoundDetails from "./pages/RoundDetails";
import MyAccount from "./pages/MyAccount";

import { useSelector, useDispatch } from 'react-redux';
import { setUser, logoutUser } from './actions/userActions';

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [responseFromAccountOrLogged, setResponseFromAccountOrLogged] = useState(false);
  const [authorize, setAuthorize] = useState(false);
  const [rounds, setRounds] =useState([])
  const [user, setUser] =useState([])
  const { id } = useParams();

  const history = useHistory();

  useEffect(() => {
    fetch("/api/me").then((r) => {
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


  useEffect(() => {
    fetch("/api/rounds").then((r) => {
      if (r.ok) {
        r.json().then((res) => {
          setRounds(res);
        });
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

  const [golfBuddies, setGolfBuddies] =useState([])
  
  useEffect(() => {
    fetch("/api/golf_buddies")
      .then(res => res.json())
      .then(setGolfBuddies)
  }, [])

  const addGolfBuddy = (newGolfBuddy) => setGolfBuddies(golfBuddies => [...golfBuddies, newGolfBuddy])

  const deleteGolfBuddy = (id) => setGolfBuddies(current => current.filter(g => g.id !== id)) 

  if (!authorize) {
    return <div></div>;
  }



  return (
    <div className="App">
      {loggedUser ? (
        <Switch>
           <Layout 
            loggedUser={loggedUser}
            onLogOut={handleLogOut}
            user={user}
            golfBuddies={golfBuddies}
            setGolfBuddies={setGolfBuddies}
            addGolfBuddy={addGolfBuddy}
            deleteGolfBuddy={deleteGolfBuddy}
            >
          <Route exact path="/">
           
             <MainPage loggedUser={loggedUser}/>
            
          </Route>
          <Route exact path="/friends">
          
             <GolfBuddies 
             loggedUser={loggedUser}
             golfBuddies={golfBuddies}
             setGolfBuddies={setGolfBuddies}
             addGolfBuddy={addGolfBuddy}
             deleteGolfBuddy={deleteGolfBuddy}
             />
            
          </Route>
          <Route exact path="/myaccount">
           
             <MyAccount 
             currentUser={loggedUser}
             setCurrentUser={setLoggedUser}
             />
            
          </Route>
          <Route exact path="/profile/:id">
        
             <Profile 
             loggedUser={loggedUser}
             />
           
          </Route>
          <Route exact path="/rounds/:id">
        
             <RoundDetails loggedUser={loggedUser}/>
           
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
            <Route exact path="/forgot_password">
              <ForgotPasswordPage/>
            </Route>
            <Route exact path="/reset_password">
              <ResetPasswordPage
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
