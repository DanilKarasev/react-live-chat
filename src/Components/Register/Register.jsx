import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerWithEmail } from "../../Store/Auth/actions";
import { RegisterResult } from "../RegisterResult";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputMask from "react-input-mask";
import { modalAnimation } from "../Animations/animations";
import "./Register.sass";

export const Register = ({ open, close }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUserName = (event) => {
    setUserName(event.target.value.replace(/[^a-zA-ZА-Яа-я0-9]/g, ""));
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value.trim());
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value.replace(/[^a-zA-Z0-9]/g, ""));
  };

  const handleRegisterNewUser = (e) => {
    e.preventDefault();
    dispatch(
      registerWithEmail(
        userName.trim(),
        phone.trim(),
        email.trim(),
        password.trim()
      )
    );
  };

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalAnimation}>
          <Typography
            sx={{ mb: 5 }}
            id="modal-modal-title"
            variant="h4"
            component="h1"
          >
            Fill up info below to register
          </Typography>
          <form onSubmit={handleRegisterNewUser}>
            <div className={"Register-inputs"}>
              <TextField
                value={userName[0] === " " ? "" : userName}
                onChange={handleChangeUserName}
                required
                type={"text"}
                label="User name"
                inputProps={{ maxLength: 20 }}
              />
              <InputMask
                value={phone}
                onChange={handleChangePhone}
                mask="+7(999)-999-99-99"
                maskChar={null}
              >
                {() => <TextField type={"text"} label="Phone number" />}
              </InputMask>
              <TextField
                value={email[0] === " " ? "" : email}
                onChange={handleChangeEmail}
                required
                type={"email"}
                label="Email"
                inputProps={{ maxLength: 40 }}
              />
              <TextField
                value={password}
                onChange={handleChangePassword}
                required
                type={"password"}
                label="Password"
                inputProps={{ maxLength: 30 }}
              />
            </div>
            <RegisterResult />
            <div className={"Add-chat-buttons"}>
              <Button variant="outlined" color="error" onClick={close}>
                Cancel
              </Button>
              <Button
                disabled={!email || !password || !userName}
                variant="outlined"
                type={"submit"}
              >
                Register
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
