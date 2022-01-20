import {
  loginWithEmailSuccess,
  loginWithEmailFailure,
  registerWithEmailSuccess,
  registerWithEmailFailure,
  logoutSuccess,
  logoutFailure,
  getUserResolved,
  createUserDb,
  createUserDbFailure,
  getUserRejected,
} from "./actions";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { AUTH } from "./constants";
import firebase from "firebase";

function* loginWithEmailSaga(payload) {
  try {
    const auth = firebase.auth();
    const result = yield call(
      [auth, auth.signInWithEmailAndPassword],
      payload.email,
      payload.password
    );
    yield put(loginWithEmailSuccess(result));
  } catch (error) {
    yield put(loginWithEmailFailure(error));
  }
}

function* logoutSaga() {
  try {
    const data = yield call([firebase.auth(), firebase.auth().signOut]);
    yield put(logoutSuccess(data));
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function* registerWithEmailSaga(payload) {
  try {
    const result = yield call(
      [firebase.auth(), firebase.auth().createUserWithEmailAndPassword],
      payload.email,
      payload.password
    );
    // yield call(
    //   firebase.auth().onAuthStateChanged(() => {
    //     firebase.auth().currentUser.updateProfile({
    //       displayName: payload.userName,
    //     });
    //   })
    // );
    yield put(createUserDb(payload));
    yield delay(1500);
    yield put(registerWithEmailSuccess(result));
  } catch (error) {
    yield put(registerWithEmailFailure(error));
  }
}

function* createUserDbSaga({ payload }) {
  try {
    const profileDatabase = (path, payload) => {
      const id = firebase.auth().currentUser.uid;
      firebase.database().ref("profile").child(id).child(path).set(payload);
    };
    yield call(profileDatabase, "userName", payload.userName);
    yield call(profileDatabase, "email", payload.email);
    yield call(profileDatabase, "phone", payload.phone);
    yield call(profileDatabase, "bio", "");
  } catch (error) {
    yield put(createUserDbFailure(error));
  }
}

function* getUserSaga() {
  function onAuthStateChanged() {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        resolve(user);
      });
    });
  }
  const user = yield call(onAuthStateChanged);
  if (!user) {
    yield put(getUserRejected(user));
  } else yield put(getUserResolved(user));
}

export default function* authRootSaga() {
  yield takeEvery(
    [
      AUTH.GET_USER.REQUEST,
      AUTH.REGISTER_WITH_EMAIL.SUCCESS,
      AUTH.LOGIN_WITH_EMAIL.SUCCESS,
    ],
    getUserSaga
  );
  yield takeEvery(AUTH.LOGIN_WITH_EMAIL.REQUEST, loginWithEmailSaga);
  yield takeEvery(AUTH.REGISTER_WITH_EMAIL.REQUEST, registerWithEmailSaga);
  yield takeEvery(AUTH.CREATE_USER_DB, createUserDbSaga);
  yield takeEvery(AUTH.LOGOUT.REQUEST, logoutSaga);
}
