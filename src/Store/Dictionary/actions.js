import {
  GET_WORD_DATA_REQUEST,
  GET_WORD_DATA_SUCCESS,
  GET_WORD_DATA_ERROR,
  FETCH_WORD_DATA,
} from "./constants";

export const getWordDataRequestAction = () => ({
  type: GET_WORD_DATA_REQUEST,
});

export const getWordDataSuccessAction = (result) => ({
  type: GET_WORD_DATA_SUCCESS,
  wordData: result[0],
});

export const getWordDataErrorAction = (error) => ({
  type: GET_WORD_DATA_ERROR,
  error: error.message,
});

export const fetchWordData = (payload) => ({
  type: FETCH_WORD_DATA,
  payload,
});
