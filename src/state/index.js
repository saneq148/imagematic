import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import Categories from "./categories/reducer";
import User from "./user/reducer";
import Profile from "./profile/reducer";
import AddPost from "./addPost/reducer";
import Posts from "./Posts/reducer";
import Post from "./post/reducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";


const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    Categories,
    User,
    Profile,
    AddPost,
    Posts,
    Post
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: "User",
};

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = (history) => persistReducer(persistConfig, rootReducer(history));

export const store = createStore(persistedReducer(history),
    composeEnhancers(
        applyMiddleware(routerMiddleware(history), thunk)
    )
);

export const persistor = persistStore(store);