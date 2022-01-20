import "./Home.sass";
import { ChatWrapper } from "../../Components/ChatWrapper";

export const Home = () => {
  return (
    <div className={"Container"}>
      <ChatWrapper />
      <div className={"Home"}>
        <div className={"Home-header"}>Welcome!</div>
        <div className={"Home-info"}>
          <p>Please select chat to start messaging</p>
        </div>
      </div>
    </div>
  );
};
