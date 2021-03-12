import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: RouteComponent, ...rest }) => {
  const user = useSelector((state) => {
    return state.auth.user;
  });
  return (
    <Route
      {...rest}
      render={(routeprops) =>
        !user ? <RouteComponent {...routeprops} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
