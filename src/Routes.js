import React from "react";
import { Route, Switch } from "react-router-dom";

import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Notes from "./containers/Notes";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import NotFound from "./containers/NotFound";
import DownloadImages from "./containers/DownloadImages";
import UploadImage from "./containers/UploadImage";

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

      <AuthenticatedRoute exact path="/notes/new">
        <NewNote />
      </AuthenticatedRoute>

      <Route exact path="/notes/:id">
        <Notes />
      </Route>

      {/* catch all */}
      <Route>
        <NotFound />
      </Route>
      
    </Switch>
  );
}