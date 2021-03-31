import * as types from "./types";

export const setLogged = (payload) => ({
    type: types.SET_LOGGED,
    payload,
});

export const setLoggedIn = (payload) => ({
    type: types.LOGIN,
    payload,
});

export const setLoggedOut = () => ({
    type: types.LOGOUT,
});

export const setUserId = (payload) => ({
    type: types.SET_USER_ID,
    payload,
});

export const setUserLogin = (payload) => ({
    type: types.SET_USER_LOGIN,
    payload,
});

export const setUserName = (payload) => ({
    type: types.SET_USER_NAME,
    payload,
});

export const setUserSurname = (payload) => ({
    type: types.SET_USER_SURNAME,
    payload,
});