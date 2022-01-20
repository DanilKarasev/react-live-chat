import { Home } from "../Screens/Home";
import { Profile } from "../Screens/Profile";
import { ROUTES } from "./constants";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { Chats } from "../Screens/Chats";
import { Dictionary } from "../Screens/Dictionary";
import { SignIn } from "../Screens/SignIn";
import { CircularProgress } from "@mui/material";
import { PrivateRoute } from "../Components/PrivateRoute";
import { PublicRoute } from "../Components/PublicRoute";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../Store/Auth/selectors";
import { useEffect } from "react";
import { getUser } from "../Store/Auth/actions";
import "./Router.sass";

export const Router = () => {
  const { loading } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={"Loading"}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path={ROUTES.HOME} render={() => <Home />} />
          <PrivateRoute
            exact
            path={ROUTES.PROFILE}
            render={() => <Profile />}
          />
          <PublicRoute exact path={ROUTES.SIGN_IN} render={() => <SignIn />} />
          <PrivateRoute path={ROUTES.CHATS} render={() => <Chats />} />
          <PrivateRoute
            path={ROUTES.DICTIONARY}
            render={() => <Dictionary />}
          />
          <PrivateRoute>
            <Redirect to={ROUTES.HOME} />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    );
  }
};
