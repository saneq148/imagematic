import { combineReducers, createStore } from "redux";
import categoriesReducer from "./categories/reducer";
import userReducer from "./user/reducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({ categoriesReducer, userReducer });

const persistConfig = {
    key: "root",
    storage,
    whitelist: "userReducer",
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());

export const persistor = persistStore(store);