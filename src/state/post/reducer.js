import * as types from "./types";

const initialState = {
    loading: false,
    loaded: false,
    error: null,
    img: null,
    title: null,
    description: null,
    created_at: null,
    updated_at: null,
    categoryTitle: null,
    categoryId: null,
    authorId: null
};

export default function Post(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case types.SET_POST:
            return {
                ...state,
                img: payload.img.filename,
                loaded: true,
                error: false,
                title: payload.title,
                description: payload.description,
                created_at: payload.created_at,
                updated_at: payload.updated_at,
                categoryTitle: payload.category.title,
                categoryId: payload.category.id
            };
        case types.SET_LOADING:
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
            return state;
    }

}