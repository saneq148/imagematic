import * as types from "./types";

const initialState = {
    isLoggedIn: false,
    id: null,
    login: null,
    name: null,
    surname: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOGGED:
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        case types.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                id: action.payload,
            };
        case types.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                id: null,
            };
        case types.SET_USER_ID:
            return {
                ...state,
                id: action.payload,
            };
        case types.SET_USER_LOGIN:
            return {
                ...state,
                login: action.payload,
            };
        case types.SET_USER_NAME:
            return {
                ...state,
                name: action.payload,
            };
        case types.SET_USER_SURNAME:
            return {
                ...state,
                surname: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;