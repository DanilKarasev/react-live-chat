import { UPDATE_MESSAGES_ACTION } from "./constants";

const initialState = {
  messageList: {},
};

export const messageListReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGES_ACTION: {
      return {
        ...state,
        messageList: action.payload.messages,
      };
    }
    default:
      return state;
  }
};
