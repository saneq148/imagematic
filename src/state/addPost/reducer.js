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
        case types.SET_ADDPOST_IMAGE:
            return {
                ...state,
                image: payload
            };
        case types.SET_ADDPOST_ORIGINAL_IMAGE:
            return {
                ...state,
                originalImage: payload
            };
        case types.SET_ADDPOST_IMAGE_EDITED:
            return {
                ...state,
                imageEdited: payload
            };
        case types.SET_ADDPOST_TITLE:
            return {
                ...state,
                title: payload
            };
        case types.SET_ADDPOST_CATEGORY:
            return {
                ...state,
                category: payload
            };
        case types.SET_ADDPOST_DESCRIPTION:
            return {
                ...state,
                description: payload
            };
        case types.SET_ADDPOST_FORM_ERRORS:
            return {
                ...state,
                formErrors: payload
            };
        case types.SET_ADDPOST_ERROR:
            return {
                ...state,
                error: payload
            };
        case types.RESET_ADDPOST_IMAGE:
            return {
                ...state,
                image: null
            };
        case types.RESET_ADDPOST_FORM:
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