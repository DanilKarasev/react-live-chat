import {
  GET_WORD_DATA_REQUEST,
  GET_WORD_DATA_SUCCESS,
  GET_WORD_DATA_ERROR,
} from "./constants";

const initialState = {
  wordData: null,
  loading: false,
  error: false,
};

export default function dictionaryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORD_DATA_REQUEST: {
      return {
        wordData: null,
        loading: true,
        error: false,
      };
    }
    case GET_WORD_DATA_SUCCESS: {
      return {
        wordData: action.wordData,
        loading: false,
        error: false,
      };
    }
    case GET_WORD_DATA_ERROR: {
      return {
        wordData: null,
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
}
