import React, { useContext } from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { isLogin } from "../utils/utils";
import { AppContext } from '../context/provider';
import Lobby from "../views/Lobby/Lobby";
import Login from '../views/Login/Login';
import Signup from '../views/Signup/Signup';
import Profile from "../views/Profile/Profile";
import { LOGIN, SIGNUP, LOBBY, PROFILE, ROOT } from "../constants/routes";

export const RouterApp = () => {
  const { state } = useContext(AppContext);

  return (
    <Switch>
        <Route
            exact
            path={LOGIN}
            render={(props) => <Login {...props} />}
        />
        <Route
            exact
            path={SIGNUP}
            render={(props) => <Signup {...props} />}
        />
        <Route
          exact
          path={LOBBY}
          render={(props) => (
            isLogin(state) ?
            <Lobby {...props} />
            : <Redirect to={LOGIN} />
          )}
        />
        <Route
          exact
          path={PROFILE}
          render={(props) => (
            isLogin(state) ?
            <Profile {...props} />
            : <Redirect to={LOGIN} />
          )}
        />
        <Route
            exact
            path={ROOT}
            render={(props) => <Login {...props} />}
        />
    </Switch>
  );
}

export default RouterApp;
