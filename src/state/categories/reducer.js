import * as types from "./types";

const initialState = {
    items: [],
    fetching: true,
    loaded: false,
    error: null,
    filters: {
        search: "",
        count: 6,
        order: "asc",
        orderBy: "title",
    },
    currentPage: 1,
    pagesCount: 1,
    categoryFetching: false,
    categoryError: null,
    bigLayout: false,
};

export default function Categories(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case types.SET_CATEGORIES:
            return {
                ...state,
                items: payload.data,
                pagesCount: payload.lastPage,
                error: null,
                loaded: true,
            };
        case types.SET_CATEGORIES_CURRENT_PAGE:
            return {
                ...state,
                currentPage: payload
            };
        case types.SET_CATEGORIES_FAILURE:
            return {
                ...state,
                error: payload,
                items: initialState.items,
                loaded: false,
            };
        case types.SET_CATEGORIES_FETCHING:
            return {
                ...state,
                fetching: payload,
            };
        case types.SET_CATEGORY_FETCHING:
            return {
                ...state,
                categoryFetching: payload,
            };
        case types.SET_CATEGORY_ERROR:
            return {
                ...state,
                categoryError: payload,
            };
        case types.DELETE_CATEGORY:
            return {
                ...state,
                items: state.items.filter(category => category.id !== payload)
            };
        case types.EDIT_CATEGORY:
            return {
                ...state,
                items: state.items.map(item => item.id === payload.id ? { ...item, title: payload.title } : item)
            };
        case types.SET_CATEGORIES_BIG_LAYOUT:
            return {
                ...state,
                bigLayout: payload
            };
        default:
            return state;
    }
}