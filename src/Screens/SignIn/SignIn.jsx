import "./SignIn.sass";
import { useSpring, animated } from "react-spring";
import { Button, CircularProgress, Input } from "@mui/material";
import { useState } from "react";
import { Register } from "../../Components/Register";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../Store/Auth/selectors";
import { loginWithEmail } from "../../Store/Auth/actions";
import { signInAnimationStyle } from "../../Components/Animations/animations";

export const SignIn = () => {
  const { loading, error } = useSelector(authSelector);
  const dispatch = useDispatch();
  const signInAnimationStyleSpring = useSpring(signInAnimationStyle);

  const [openRegister, setOpenRegister] = useState(false);
  const handleOpenRegisterModal = () => setOpenRegister(true);
  const handleCloseRegisterModal = () => setOpenRegister(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginWithEmail(email, password));
  };

  return (
    <animated.div
      style={signInAnimationStyleSpring}
      className={"Container Sign-in"}
    >
      <div className={"Login-wrapper"}>
        <div className={"Login-main"}>
          <h1>Welcome!</h1>
          <h3>Please log in using existing account, or register a new one.</h3>
          <form className={"Login-form"} onSubmit={handleLogin}>
            <div className={"Login-inputs"}>
              <Input
                value={email}
                type={"email"}
                placeholder={"email"}
                onChange={handleChangeEmail}
              />
              <Input
                value={password}
                type={"password"}
                placeholder={"password"}
                onChange={handleChangePassword}
              />
            </div>
            <Button
              disabled={!email || !password}
              type={"submit"}
              color={"error"}
            >
              Sign in
            </Button>
          </form>
          <div className={"Error"}>
            {error?.login} {loading && <CircularProgress />}
          </div>
        </div>
        <div className={"Register-main"}>
          <h4>Don't have an account? </h4>
          <Button onClick={handleOpenRegisterModal} color={"error"}>
            Register
          </Button>
        </div>
      </div>
      <Register open={openRegister} close={handleCloseRegisterModal} />
    </animated.div>
  );
};
