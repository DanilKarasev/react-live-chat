import { useSelector } from "react-redux";
import { messageListSelector } from "../../Store/Messages/selectors";
import { useSpring, animated } from "react-spring";
import { currentUserSelector } from "../../Store/Auth/selectors";
import { useEffect, useRef } from "react";
import stringToColor from "../../Utilities/StringToColor";
import "./MessageList.sass";

export const MessageList = ({ chatId }) => {
  const { uid } = useSelector(currentUserSelector);
  const messageList = useSelector(messageListSelector);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (messageList[chatId]) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList, chatId]);

  const animationStyle = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
  });

  if (!messageList[chatId]) {
    return (
      <div className={"Home-info"}>
        <p>No messages here yet...</p>
      </div>
    );
  } else
    return (
      <animated.div style={animationStyle} className={"Chat-body"}>
        {Object.values(messageList[chatId]).map(
          ({ authorId, authorName, id, message, time }) => (
            <div
              key={id}
              className={authorId === uid ? "Message Message-me" : "Message"}
              ref={scrollRef}
            >
              <h4 style={{ color: stringToColor(authorName) }}>{authorName}</h4>
              <div className={"Message-box"}>
                <div className={"Message-text"}>{message}</div>
                <div className={"Message-time"}>{time.slice(0, -3)}</div>
              </div>
            </div>
          )
        )}
      </animated.div>
    );
};
