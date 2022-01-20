import { db } from "../../Services/firebase";
import {
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { updateChatAction } from "./actions";
import { ADD_CHAT_ACTION, DELETE_CHAT_ACTION } from "./constants";
import { eventChannel } from "redux-saga";
import { AUTH } from "../Auth/constants";

function* addChatWithFirebase({ payload }) {
  const addChatToDb = (id, name) => {
    db.ref("chats").child(id).set({
      id: id,
      name: name,
      avatar: "",
    });
  };
  yield call(addChatToDb, payload.newChatId, payload.newChatName);
}

function* deleteChatWithFirebase({ payload }) {
  const deleteChatFromDb = (id) => {
    db.ref("chats").child(id).remove();
  };
  yield call(deleteChatFromDb, payload.id);
}

function getPayloadFromSnapshot(snapshot) {
  const snapshotChats = [];

  snapshot.forEach((data) => {
    snapshotChats.push({ [data.key]: data.val() });
  });

  const chats = snapshotChats.reduce(function (result, item) {
    const key = Object.keys(item)[0];
    result[key] = item[key];
    return result;
  }, {});

  return { chats };
}

function createEventChannel() {
  const listener = eventChannel((emit) => {
    db.ref("chats").on("value", (snapshot) =>
      emit(getPayloadFromSnapshot(snapshot))
    );
    return () => db.ref("chats").off(listener);
  });
  return listener;
}

function* initChatsTrackingSaga() {
  const updateChannel = createEventChannel();
  while (true) {
    const chats = yield take(updateChannel);
    yield put(updateChatAction(chats));
  }
}

export default function* chatsRootSaga() {
  yield takeEvery(DELETE_CHAT_ACTION, deleteChatWithFirebase);
  yield takeEvery(ADD_CHAT_ACTION, addChatWithFirebase);
  yield takeLatest(AUTH.GET_USER.RESOLVED, initChatsTrackingSaga);
  yield fork(initChatsTrackingSaga);
}
