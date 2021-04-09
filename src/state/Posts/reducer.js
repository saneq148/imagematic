import * as types from "./types";

const initialState = {
    posts: [],
    loading: false,
    error: null
};

const Posts = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_POSTS:
            return {
                ...state,
                posts: payload
            };
        case types.SET_FETCHING:
            return {
                ...state,
                loading: payload
            };
        case types.SET_ERROR:
            return {
                ...state,
                error: payload
            };
        default:
            return {
                ...state
            };
    }
};

export default Posts;