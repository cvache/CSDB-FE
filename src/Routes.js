import React from "react";
import { Route, Switch } from "react-router-dom";

import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import DownloadImages from "./containers/DownloadImages";
import UploadImage from "./containers/UploadImage";
import ApiDocs from "./containers/ApiDocs";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>

      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>

      <AuthenticatedRoute exact path="/image/download">
        <DownloadImages />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/image/upload">
        <UploadImage />
      </AuthenticatedRoute>
      
      <AuthenticatedRoute exact path="/api">
        <ApiDocs />
      </AuthenticatedRoute>

      {/* catch all */}
      <Route>
        <NotFound />
      </Route>
      
    </Switch>
  );
}