import {
  legacy_createStore as createStore,
} from "redux";
import todoReducer from "./todoReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, todoReducer)

export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store)

