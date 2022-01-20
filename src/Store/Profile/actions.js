import {
  CHANGE_PROFILE_INFO_REQUEST,
  CHANGE_PROFILE_INFO_SUCCESS,
  UPDATE_PROFILE_INFO_ACTION,
} from "./constants";

export const updateProfileInfoAction = (payload) => ({
  type: UPDATE_PROFILE_INFO_ACTION,
  payload,
});

export const changeProfileInfoRequest = (newUserName, newPhone, newBio) => ({
  type: CHANGE_PROFILE_INFO_REQUEST,
  newUserName,
  newPhone,
  newBio,
});

export const changeProfileInfoSuccess = () => ({
  type: CHANGE_PROFILE_INFO_SUCCESS,
});
