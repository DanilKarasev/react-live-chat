import { db } from "../../Services/firebase";
import { call, put, takeEvery } from "redux-saga/effects";
import { changeProfileInfoSuccess, updateProfileInfoAction } from "./actions";
import firebase from "firebase";
import { AUTH } from "../Auth/constants";
import {
  CHANGE_PROFILE_INFO_REQUEST,
  CHANGE_PROFILE_INFO_SUCCESS,
} from "./constants";

function getPayloadFromSnapshot(snapshot) {
  const snapshotData = [];
  snapshot.forEach((data) => {
    snapshotData.push({ [data.key]: data.val() });
  });

  const profileInfo = snapshotData.reduce(function (result, item) {
    const key = Object.keys(item)[0];
    result[key] = item[key];
    return result;
  }, {});
  return { ...profileInfo };
}

function* getProfileInfoSaga() {
  function getPayload() {
    return new Promise((resolve) => {
      const userId = firebase.auth().currentUser.uid;
      db.ref("profile")
        .child(userId)
        .on("value", (snapshot) => {
          resolve(getPayloadFromSnapshot(snapshot));
        });
    });
  }
  const profileInfo = yield call(getPayload);
  yield put(updateProfileInfoAction(profileInfo));
}

function* updateUserDbSaga(payload) {
  const profileDatabase = (path, payload) => {
    const id = firebase.auth().currentUser.uid;
    firebase.database().ref("profile").child(id).child(path).set(payload);
  };
  yield call(profileDatabase, "userName", payload.newUserName);
  yield call(profileDatabase, "phone", payload.newPhone);
  yield call(profileDatabase, "bio", payload.newBio);
  yield put(changeProfileInfoSuccess());
}

export default function* profileRootSaga() {
  yield takeEvery(AUTH.GET_USER.RESOLVED, getProfileInfoSaga);
  yield takeEvery(CHANGE_PROFILE_INFO_REQUEST, updateUserDbSaga);
  yield takeEvery(CHANGE_PROFILE_INFO_SUCCESS, getProfileInfoSaga);
}
