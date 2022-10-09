import React from "react";
import { Redirect, Route } from "react-router-dom";
import { userService } from "../services/user.service";

export const AppRoute = ({
  component: Component,
  //isProtectedRoute,
  requiredRole,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (requiredRole) {
        if (!userService.getAuthentication()) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        if (
          requiredRole &&
          !requiredRole.includes(userService.getUserRole()) &&
          requiredRole !== "*"
        ) {
          return <Redirect to={{ pathname: "/error-403" }} />;
        }
      }

      if (
        props.location.pathname === "/login" &&
        userService.getAuthentication()
      ) {
        return <Redirect to={{ pathname: "/" }} />;
      }

      return <Component {...props} />;
    }}
  />
);
