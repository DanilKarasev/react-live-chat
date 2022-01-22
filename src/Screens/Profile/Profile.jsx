import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import { ChatWrapper } from "../../Components/ChatWrapper";
import { logout } from "../../Store/Auth/actions";
import { ProfileInfo } from "../../Components/ProfileInfo";
import { profileSelector } from "../../Store/Profile/selectors";
import { ROUTES } from "../../Router/constants";
import { Redirect, useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Profile.sass";

export const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { profileInfoIsChanged } = useSelector(profileSelector);
  const { profileInfoLoading } = useSelector(profileSelector);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleClickCloseSidebar = () => {
    history.push("/");
  };

  if (profileInfoIsChanged) {
    return <Redirect to={ROUTES.HOME} />;
  }
  if (profileInfoLoading) {
    return (
      <div className={"Loading"}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={"Container"}>
      <ChatWrapper />
      <div className={"Profile"}>
        <div className={"Profile-header"}>
          <div className={"Profile-header-left"}>
            <button
              onClick={handleClickCloseSidebar}
              className={"Btn-sidebar-close"}
            >
              <ArrowBackIcon />
            </button>
            <p>Profile settings</p>
          </div>
          <Button onClick={handleLogout} color={"error"}>
            LOGOUT
          </Button>
        </div>
        <div className={"Profile-main"}>
          <div className={"Profile-info"}>
            <div className={"Profile-info-content"}>
              <ProfileInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
