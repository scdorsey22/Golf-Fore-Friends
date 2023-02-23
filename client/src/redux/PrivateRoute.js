import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./slices/userSlice";

function PrivateRoute({ children, ...rest }) {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.data ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
