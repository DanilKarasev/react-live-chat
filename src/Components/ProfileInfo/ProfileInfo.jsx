import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { changeProfileInfoRequest } from "../../Store/Profile/actions";
import { profileInfoSelector } from "../../Store/Profile/selectors";
import InputMask from "react-input-mask";
import Avatar from "@mui/material/Avatar";
import stringToColor from "../../Utilities/StringToColor";
import "./ProfileInfo.sass";

export const ProfileInfo = () => {
  const dispatch = useDispatch();
  const { userName, phone, bio } = useSelector(profileInfoSelector);

  const [profileInfoChanged, setProfileInfoChanged] = useState(false);

  const [newUserName, setNewUserName] = useState(userName);
  const [newPhone, setNewPhone] = useState(phone);
  const [newBio, setNewBio] = useState(bio);

  const handleChangeUserName = (event) => {
    setNewUserName(event.target.value.replace(/\s+/g, " "));
  };
  const handleChangePhone = (event) => {
    setNewPhone(event.target.value);
  };
  const handleChangeBio = (event) => {
    setNewBio(event.target.value);
  };

  useEffect(() => {
    if (newUserName !== userName || newPhone !== phone || newBio !== bio) {
      setProfileInfoChanged(true);
    } else {
      setProfileInfoChanged(false);
    }
  }, [userName, phone, bio, newUserName, newPhone, newBio]);

  const buttonAnimation = useSpring({
    opacity: profileInfoChanged ? 1 : 0,
    marginTop: profileInfoChanged ? 0 : 150,
  });

  const handleUpdateProfileInfo = () => {
    dispatch(changeProfileInfoRequest(newUserName, newPhone, newBio));
  };

  function stringAvatar(name) {
    if (name.includes(" ")) {
      return {
        sx: {
          bgcolor: stringToColor(name),
          width: "100%",
          height: "100%",
          fontSize: "6.5rem",
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
    }
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: "100%",
        height: "100%",
        fontSize: "6.5rem",
      },
      children: `${name[0]}`,
    };
  }

  return (
    <>
      <div className={"Profile-avatar"}>
        <Avatar {...stringAvatar(userName)} />
      </div>
      <div className={"Profile-inputs"}>
        <TextField
          id="outlined-input"
          label="User name"
          value={newUserName}
          onChange={handleChangeUserName}
          inputProps={{ maxLength: 20, minLength: 5 }}
        />
        <InputMask
          value={newPhone}
          onChange={handleChangePhone}
          mask="+7(999) 999 99 99"
          maskChar=" "
        >
          {() => <TextField type={"text"} id="outlined" label="Phone number" />}
        </InputMask>
        <TextField
          id="outlined-input"
          label="Bio"
          value={newBio}
          onChange={handleChangeBio}
          inputProps={{ maxLength: 50 }}
        />
      </div>
      <animated.div style={buttonAnimation}>
        <Button onClick={handleUpdateProfileInfo} sx={{ mt: 4 }}>
          Apply changes
        </Button>
      </animated.div>
    </>
  );
};
