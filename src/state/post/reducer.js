import * as types from "./types";

const initialState = {
    loading: true,
    loaded: false,
    error: null,
    img: null,
    title: null,
    description: null,
    created_at: null,
    updated_at: null,
    categoryTitle: null,
    categoryId: null,
    authorId: null,
    author: null,
    authorName: null,
    authorSurname: null,
    postId: null,
    imageId: null
};

export default function Post(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case types.SET_POSTPAGE_POST:
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
                categoryId: payload.category.id,
                authorId: payload.created_by,
                imageId: payload.image,
                postId: payload.id
            };
        case types.SET_POSTPAGE_LOADING:
            return {
                ...state,
                loading: payload
            };
        case types.SET_POSTPAGE_ERROR:
            return {
                ...state,
                error: payload
            };
        case types.SET_POSTPAGE_AUTHOR:
            return {
                ...state,
                author: payload.username,
                authorName: payload.first_name,
                authorSurname: payload.last_name
            };
        case types.RESET_POSTPAGE_POST:
            return initialState;
        default:
            return state;
    }

}