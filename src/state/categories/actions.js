import * as types from "./types";

export const setCategories = payload => ({
    type: types.SET_CATEGORIES,
    payload,
});

export const deleteCategory = payload => ({
    type: types.DELETE_CATEGORY,
    payload,
});

export const editCategory = payload => ({
    type: types.EDIT_CATEGORY,
    payload,
});