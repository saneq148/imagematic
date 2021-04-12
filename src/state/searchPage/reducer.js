import * as types from "./types";

const initialState = {
    posts: [],
    loading: false,
    error: null,
    hasMore: true,
    pageNumber: 0,
    query: ""
};

const SearchPage = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_SEARCHPAGE_QUERY:
            return {
                ...state,
                query: payload,
                posts: initialState.posts,
                hasMore: true
            };
        case types.SET_SEARCHPAGE_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...payload]
            };
        case types.SET_SEARCHPAGE_FETCHING:
            return {
                ...state,
                loading: payload
            };
        case types.SET_SEARCHPAGE_ERROR:
            return {
                ...state,
                error: payload
            };
        case types.SET_SEARCHPAGE_HAS_MORE:
            return {
                ...state,
                hasMore: payload
            };
        case types.SET_SEARCHPAGE_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: payload
            };
        case types.RESET_SEARCHPAGE_POSTS:
            return initialState;
        default:
            return {
                ...state
            };
    }
};

export default SearchPage;