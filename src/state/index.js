import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import categoriesReducer from "./categories/reducer";
import userReducer from "./user/reducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";



const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    categoriesReducer,
    userReducer
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: "userReducer",
};

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = (history) => persistReducer(persistConfig, rootReducer(history));

export const store = createStore(persistedReducer(history), /* preloadedState, */
    composeEnhancers(
        applyMiddleware(routerMiddleware(history), thunk)
    )
);

/*export const store = createStore(persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());*/

export const persistor = persistStore(store);