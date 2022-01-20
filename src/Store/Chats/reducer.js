import { UPDATE_CHAT_ACTION } from "./constants";

const initialState = {
  loading: true,
  chatList: {
    // id1: {
    //   id: "id1",
    //   name: "React JS",
    //   avatar: react_js,
    // },
    // id2: {
    //   id: "id2",
    //   name: "GB_JS",
    //   avatar: gb_js,
    // },
  },
};

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHAT_ACTION: {
      return { loading: false, chatList: action.payload.chats };
    }
    default:
      return state;
  }
};
