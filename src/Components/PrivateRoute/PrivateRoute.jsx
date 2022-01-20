import { Redirect, Route } from "react-router-dom";
import { ROUTES } from "../../Router/constants";
import { useSelector } from "react-redux";
import { authSelector } from "../../Store/Auth/selectors";

export const PrivateRoute = ({ auth, ...rest }) => {
  const { loggedIn } = useSelector(authSelector);
  return loggedIn ? <Route {...rest} /> : <Redirect to={ROUTES.SIGN_IN} />;
};
