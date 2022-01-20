import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./AddChat.sass";
import { addChatAction } from "../../Store/Chats/actions";
import faker from "faker";
import { addMessageAction } from "../../Store/Messages/actions";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";

export const AddChat = ({ open, close }) => {
  const dispatch = useDispatch();
  const [newChatName, setNewChatName] = useState("");

  const handleChange = (event) => {
    setNewChatName(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const addChat = (e) => {
    e.preventDefault();
    const newChatId = faker.datatype.uuid();
    dispatch(addChatAction({ newChatName, newChatId }));
    const fakeMessageId = Date.now();
    dispatch(
      addMessageAction({
        chatId: newChatId,
        messageAuthor: "Welcome Bot",
        message: `Welcome to ${newChatName} chat!`,
        messageAuthorId: faker.datatype.uuid(),
        fakeMessageId,
      })
    );
    setNewChatName("");
    close();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ mb: 1 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Add a new chat:
          </Typography>
          <form onSubmit={addChat}>
            <TextField
              fullWidth
              onChange={handleChange}
              value={newChatName}
              sx={{ ml: 0 }}
              placeholder="Type new chat name"
              inputProps={{ "aria-label": "Add chats", maxLength: 20 }}
            />
            <div className={"Add-chat-buttons"}>
              <Button variant="outlined" color="error" onClick={close}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                disabled={!newChatName}
                type={"submit"}
              >
                Add
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
