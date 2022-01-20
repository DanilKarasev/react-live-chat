import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Register.sass";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerWithEmail } from "../../Store/Auth/actions";
import { RegisterResult } from "../RegisterResult";
import InputMask from "react-input-mask";
import { modalAnimation } from "../Animations/animations";

export const Register = ({ open, close }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUserName = (event) => {
    setUserName(event.target.value.replace(/\s+/g, " "));
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value.trim());
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value.replace(/\s/g, ""));
  };

  const handleRegisterNewUser = (e) => {
    e.preventDefault();
    dispatch(registerWithEmail(userName.trim(), phone, email, password));
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
                value={userName}
                onChange={handleChangeUserName}
                required
                type={"text"}
                id="outlined-required"
                label="User name"
                inputProps={{ maxLength: 20 }}
              />
              <InputMask
                value={phone}
                onChange={handleChangePhone}
                mask="+7(999) 999 99 99"
                maskChar=" "
              >
                {() => (
                  <TextField
                    type={"text"}
                    id="outlined-required"
                    label="Phone number"
                  />
                )}
              </InputMask>
              <TextField
                value={email}
                onChange={handleChangeEmail}
                required
                type={"email"}
                id="outlined-required"
                label="Email"
                inputProps={{ maxLength: 40 }}
              />
              <TextField
                value={password}
                onChange={handleChangePassword}
                required
                type={"password"}
                id="outlined-required"
                label="Password"
                inputProps={{ maxLength: 30 }}
              />
            </div>
            <RegisterResult />
            <div className={"Add-chat-buttons"}>
              <Button variant="outlined" color="error" onClick={close}>
                Cancel
              </Button>
              <Button variant="outlined" type={"submit"}>
                Register
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
