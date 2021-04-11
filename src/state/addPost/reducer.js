import * as types from "./types";

const initialState = {
    image: null,
    originalImage: null,
    imageEdited: false,
    title: "",
    description: "",
    category: "",
    formErrors: null,
    error: null
};

const AddPost = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_IMAGE:
            return {
                ...state,
                image: payload
            };
        case types.SET_ORIGINAL_IMAGE:
            return {
                ...state,
                originalImage: payload
            };
        case types.SET_IMAGE_EDITED:
            return {
                ...state,
                imageEdited: payload
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
        case types.SET_FORM_ERRORS:
            return {
                ...state,
                formErrors: payload
            };
        case types.SET_ERROR:
            return {
                ...state,
                error: payload
            };
        case types.RESET_IMAGE:
            return {
                ...state,
                image: null
            };
        case types.RESET_FORM:
            return {
                ...state,
                title: "",
                description: "",
                category: "",
                formErrors: null,
            };
        default:
            return {
                ...state,
            };
    }


};

export default AddPost;