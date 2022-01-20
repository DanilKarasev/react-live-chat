import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { profileReducer } from "./Profile/reducer";
import { chatsReducer } from "./Chats/reducer";
import { messageListReducer } from "./Messages/reducer";
import dictionaryReducer from "./Dictionary/reducer";
import authReducer from "./Auth/reducer";
import fetchWordData from "./Dictionary/sagas";
import authRootSaga from "./Auth/sagas";
import chatsRootSaga from "./Chats/sagas";
import messageRootSaga from "./Messages/sagas";
import profileRootSaga from "./Profile/sagas";

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["auth", "messages", "chats", "profile"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  chats: chatsReducer,
  messages: messageListReducer,
  dictionary: dictionaryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

export const persistor = persistStore(store);

sagaMiddleware.run(messageRootSaga);
sagaMiddleware.run(fetchWordData);
sagaMiddleware.run(authRootSaga);
sagaMiddleware.run(chatsRootSaga);
sagaMiddleware.run(profileRootSaga);
