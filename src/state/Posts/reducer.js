import * as types from "./types";

const initialState = {
    posts: [],
    loading: false,
    error: null,
    hasMore: true,
    pageNumber: 0,
};

const Posts = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...payload]
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
        case types.SET_HAS_MORE:
            return {
                ...state,
                hasMore: payload
            };
        case types.SET_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: payload
            };
        case types.RESET_POSTS:
            return initialState;
        default:
            return {
                ...state
            };
    }
};

export default Posts;