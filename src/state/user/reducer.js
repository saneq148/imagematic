import * as types from "./types";

const initialState = {
    isLoggedIn: false,
    id: null,
    login: null,
    name: null,
    surname: null,
    isFetching: false,
    error: null,
};

const User = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGOUT:
            return {
                ...initialState
            };
        case types.SET_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                id: action.payload.id,
                login: action.payload.username,
                name: action.payload.first_name,
                surname: action.payload.last_name,
                isFetching: false,
            };
        default:
            return state;
    }
};

export default User;