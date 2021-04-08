import * as types from "./types";

const initialState = {
    image: null,
    title: "",
    description: "",
    category: "",
    categories: [],
    formErrors: null
};

const AddPost = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_IMAGE:
            return {
                ...state,
                image: payload
            };
        case types.SET_TITLE:
            return {
                ...state,
                title: payload
            };
        case types.SET_CATEGORY:
            return {
                ...state,
                category: payload
            };
        case types.SET_DESCRIPTION:
            return {
                ...state,
                description: payload
            };
        case types.SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            };
        case types.SET_FORM_ERRORS:
            return {
                ...state,
                formErrors: payload
            };
        case types.RESET_IMAGE:
            return {
                ...state,
                image: null
            };
        default:
            return {
                ...state,
            };
    }


};

export default AddPost;