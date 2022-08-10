import React from "react";
import NavBar from "./NavBar";

function Header({ loggedUser, onLogOut, }) {
  return (
    <header id="header">
      <div id="logo-and-title">
        <img
          id="logo"
          src="https://assets-global.website-files.com/6023f58bb7aff50d0eb641bf/607e4a753c46c0ed92197dbb_golf-ball.png"
          alt="Website logo"
        />
        <h1>Golf Buddies</h1>
      </div>
      <NavBar loggedUser={loggedUser} onLogOut={onLogOut}/>
    </header>
  );
}

export default Header;