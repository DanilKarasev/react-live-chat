import { Link } from "react-router-dom";
import { ROUTES } from "../../Router/constants";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import "./SearchChats.sass";

export const SearchChats = ({ setSearch }) => {
  return (
    <div className={"Chat-left-header"}>
      <Link to={ROUTES.PROFILE}>
        <Avatar sx={{ bgcolor: "#3390ec" }} />
      </Link>

      <Paper
        component="div"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          boxShadow: "none",
          borderRadius: "0",
          borderBottom: "1px solid #dfe1e5",
        }}
      >
        <SearchIcon sx={{ color: "#a2a5a8", paddingLeft: "10px" }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Chats"
          inputProps={{ "aria-label": "search chats" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>
    </div>
  );
};
