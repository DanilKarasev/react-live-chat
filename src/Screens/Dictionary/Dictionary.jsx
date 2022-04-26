import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Button, TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import "./Dictionary.sass";
import { DictionaryContent } from "../../Components/DictionaryContent";
import { useDispatch } from "react-redux";
import { fetchWordData } from "../../Store/Dictionary/actions";
import { ChatWrapper } from "../../Components/ChatWrapper";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Dictionary = () => {
  const history = useHistory();

  const animationStyle = useSpring({
    config: { duration: 400 },
    to: { opacity: 1 },
    from: { opacity: 0.5 },
  });

  const dispatch = useDispatch();

  const [wordToCheck, setWordToCheck] = useState("");
  const handleWord = (e) => {
    setWordToCheck(e.target.value);
  };

  const handleWordData = (e) => {
    e.preventDefault();
    setWordToCheck("");
    dispatch(fetchWordData({ wordToCheck }));
  };

  const handleClickCloseSidebar = () => {
    history.push("/");
  };

  return (
    <div className={"Container"}>
      <ChatWrapper />
      <animated.div style={animationStyle} className={"Profile"}>
        <div className={"Profile-header Dictionary-header"}>
          <button
            onClick={handleClickCloseSidebar}
            className={"Btn-sidebar-close"}
          >
            <ArrowBackIcon />
          </button>
          <p>Dictionary</p>
        </div>
        <div className={"Dictionary-main"}>
          <FormGroup>
            <form className={"Dictionary-form"} onSubmit={handleWordData}>
              <TextField
                value={wordToCheck}
                onChange={handleWord}
                id="outlined-basic"
                label="Type any word"
                variant="outlined"
              />
              <Button type={"submit"} disabled={!wordToCheck}>
                Check word
              </Button>
            </form>
          </FormGroup>

          <div className={"Dictionary-info"}>
            <div className={"Dictionary-info-content"}>
              <DictionaryContent />
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};
