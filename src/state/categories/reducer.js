import * as types from "./types";

const initialState = {
    items: [],
};

export default function categoriesReducer(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case types.SET_CATEGORIES:
            return {
                ...state,
                items: payload,
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
        default:
            return state;
    }
}