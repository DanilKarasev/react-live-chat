import React, { useState } from "react";
import { ROUTES } from "../../Router/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  chatListLoadingSelector,
  chatListSelector,
} from "../../Store/Chats/selectors";
import { SearchChats } from "../SearchChats";
import { deleteChatAction } from "../../Store/Chats/actions";
import { deleteMessageListAction } from "../../Store/Messages/actions";
import { Link, useLocation } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import "./ChatList.sass";
import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";
import { Button, CircularProgress } from "@mui/material";

export const ChatList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector(chatListLoadingSelector);
  const chatList = Object.values(useSelector(chatListSelector));
  const [search, setSearch] = useState("");
  const filteredChats = chatList.filter((chat) => {
    return chat.name.toLowerCase().includes(search.toLowerCase());
  });

  let currentChatId = location.pathname.split("/");
  currentChatId = currentChatId[currentChatId.length - 1]; //Имя текущего чата в виде строки

  const removeChat = (id) => {
    dispatch(deleteChatAction({ id }));
    dispatch(deleteMessageListAction({ id }));
  };

  if (loading) {
    return (
      <>
        <SearchChats setSearch={setSearch} />
        <div className={"Chat-content"}>
          <div className={"Loading-chats"}>
            <CircularProgress />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SearchChats setSearch={setSearch} />
      <div className={"Chat-content"}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Список чатов
            </ListSubheader>
          }
        >
          {filteredChats.map(({ id, name, avatar }) => (
            <Link key={id} to={ROUTES.CHAT + id}>
              <ContextMenuTrigger id={id}>
                <ListItemButton
                  selected={id === currentChatId}
                  sx={{ gap: "10px" }}
                >
                  <Avatar alt={name} src={avatar}>
                    {name[0]}
                  </Avatar>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ContextMenuTrigger>
              <ContextMenu id={id}>
                <Button
                  data={{ foo: "bar" }}
                  color="error"
                  onClick={() => removeChat(id)}
                >
                  DELETE CHAT
                </Button>
              </ContextMenu>
            </Link>
          ))}
        </List>
      </div>
    </>
  );
};
