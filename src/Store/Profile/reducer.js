import {
  CHANGE_PROFILE_INFO_REQUEST,
  CHANGE_PROFILE_INFO_SUCCESS,
  UPDATE_PROFILE_INFO_ACTION,
} from "./constants";

const initialState = {
  profileInfoLoading: true,
  profileInfoIsChanged: false,
  profileInfo: {},
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PROFILE_INFO_REQUEST: {
      return {
        ...state,
        profileInfoIsChanged: false,
      };
    }
    case CHANGE_PROFILE_INFO_SUCCESS: {
      return {
        ...state,
        profileInfoIsChanged: true,
      };
    }
    case UPDATE_PROFILE_INFO_ACTION: {
      return {
        profileInfoLoading: false,
        profileInfoIsChanged: false,
        profileInfo: action.payload,
      };
    }
    default:
      return state;
  }
};
