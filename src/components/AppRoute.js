import React from "react";
import { Redirect, Route } from "react-router-dom";
import { userService } from "../services/user.service";

export const AppRoute = ({
  component: Component,
  isProtectedRoute,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isProtectedRoute) {
        if (!userService.getAuthentication()) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        if (
          userService
            .getAuthorizedPages()
            .filter((page) => page.pageUrl === path).length <= 0
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
