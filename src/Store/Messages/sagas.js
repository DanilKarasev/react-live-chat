import {
  call,
  put,
  takeEvery,
  fork,
  take,
  takeLatest,
} from "redux-saga/effects";
import { updateMessagesAction } from "./actions";
import { ADD_MESSAGE_ACTION, DELETE_CHAT_MESSAGES_ACTION } from "./constants";
import { db } from "../../Services/firebase";
import { eventChannel } from "redux-saga";
import { AUTH } from "../Auth/constants";

function* addMessageWithFirebase({ payload }) {
  const addMessageToDb = (
    chatId,
    messageAuthor,
    message,
    fakeMessageId,
    messageAuthorId
  ) => {
    db.ref("messages")
      .child(chatId)
      .child(fakeMessageId)
      .set({
        message: message,
        authorName: messageAuthor,
        id: fakeMessageId,
        time: new Date().toTimeString().split(" ")[0],
        authorId: messageAuthorId,
      });
  };
  yield call(
    addMessageToDb,
    payload.chatId,
    payload.messageAuthor,
    payload.message,
    payload.fakeMessageId,
    payload.messageAuthorId
  );
}

function* deleteMessagesWithFirebase({ payload }) {
  const deleteMessagesFromDb = (chatId) => {
    db.ref("messages").child(chatId).remove();
  };
  yield call(deleteMessagesFromDb, payload.id);
}

// function* addBotMessageWithSagaAction(action) {
//   const { chatId, messageAuthor } = action.payload;
//   const { displayName } = yield select(currentUserSelector);
//   const fakeMessageId = Date.now();
//
//   if (messageAuthor === displayName) {
//     yield delay(1500);
//     yield put(
//       addMessageAction({
//         chatId,
//         messageAuthor: faker.name.findName(),
//         message: faker.lorem.sentence(),
//         fakeMessageId,
//       })
//     );
//   }
// }

function getPayloadFromSnapshot(snapshot) {
  const snapshotMessages = [];

  snapshot.forEach((data) => {
    snapshotMessages.push({ [data.key]: data.val() });
  });

  const messages = snapshotMessages.reduce((result, item) => {
    const key = Object.keys(item)[0];
    result[key] = Object.values(item[key]);
    return result;
  }, {});

  return { messages };
}

function createEventChannel() {
  const listener = eventChannel((emit) => {
    db.ref("messages").on("value", (snapshot) =>
      emit(getPayloadFromSnapshot(snapshot))
    );
    return () => db.ref("messages").off(listener);
  });
  return listener;
}

function* initMessagesTrackingSaga() {
  const updateChannel = createEventChannel();
  while (true) {
    const messages = yield take(updateChannel);
    yield put(updateMessagesAction(messages));
  }
}

export default function* messageRootSaga() {
  yield takeEvery(ADD_MESSAGE_ACTION, addMessageWithFirebase);
  yield takeEvery(DELETE_CHAT_MESSAGES_ACTION, deleteMessagesWithFirebase);
  yield takeLatest(AUTH.GET_USER.RESOLVED, initMessagesTrackingSaga);
  yield fork(initMessagesTrackingSaga);
}
