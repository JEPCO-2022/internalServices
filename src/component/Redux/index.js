import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import CustomerReducer from "./Customer/CustomerReducer";

const persistConfig = {
  key: "root",
  storage,
  manualPersist: true,
};
const reducers = combineReducers({ Customer: CustomerReducer });
const persistreducer = persistReducer(persistConfig, reducers);
const store = createStore(persistreducer, applyMiddleware(thunk));
const Presist = persistStore(store);
export { Presist };
export default store;
