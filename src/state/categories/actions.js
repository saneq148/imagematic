import * as types from "./types";
import axios from "axios";
import { HOST } from "src/config";

export const setCurrentPage = (payload) => ({
    type: types.SET_CATEGORIES_CURRENT_PAGE,
    payload
});

export const setBigLayout = (payload) => ({
    type: types.SET_CATEGORIES_BIG_LAYOUT,
    payload
});

export const fetchCategories = (limit, order, orderBy, q) => {
    return (dispatch, getState) => {
        dispatch(setCategoriesFetching(true));
        const currentPage = getState().Categories.currentPage;
        axios.get(`${HOST}/api/categories`, {
            params: {
                page: currentPage,
                limit,
                orderBy,
                order,
                q,
                token: localStorage.getItem("token")
            }
        })
            .then(res => {
                dispatch(setCategories(res.data));
            })
            .catch(err => {
                if (err.response) {
                    dispatch(setCategoriesFailure(err.response.data.error.message));
                } else if (err.request) {
                    dispatch(setCategoriesFailure("Сервер недоступний"));
                } else {
                    dispatch(setCategoriesFailure(err.message));
                }
            })
            .finally(() => {
                dispatch(setCategoriesFetching(false));
            });
    };
};

export const addCategory = (title, reloadCategories, closeModalWindow, successMessage) => {
    return dispatch => {
        dispatch(setCategoryFetching(true));
        axios.post(`${HOST}/api/categories`, {
            title,
            token: localStorage.getItem("token")
        })
            .then(() => {
                reloadCategories();
                closeModalWindow();
                successMessage("Категорія додана");
            })
            .finally(() => {
                dispatch(setCategoryFetching(false));
            });
    };
};

export const editCategory = (id, title, closeModalWindow, successMessage) => {
    return dispatch => {
        dispatch(setCategoryFetching(true));
        axios.put(`${HOST}/api/categories/${id}`, {
            title,
            token: localStorage.getItem("token")
        })
            .then(() => {
                dispatch(editCategoryLocaly({ id, title }));
                closeModalWindow();
                successMessage("Назву змінено");
            })
            .finally(() => {
                dispatch(setCategoryFetching(false));
            });
    };
};

export const deleteCategory = (id, reloadCategories, closeModalWindow, successMessage, resetDeleteItems) => {
    return dispatch => {
        dispatch(setCategoryFetching(true));
        axios.delete(`${HOST}/api/categories/${id}`, {
            params: {
                token: localStorage.getItem("token")
            }
        })
            .then(() => {
                dispatch(deleteCategoryLocaly(id));
                closeModalWindow();
                successMessage("Категорію видалено");
                reloadCategories();
                resetDeleteItems([]);
            })
            .catch((e) => {
                dispatch(setCategoryError(e.message));
            })
            .finally(() => {
                dispatch(setCategoryFetching(false));
            });
    };
};

export const deleteCategories = (categories, reloadCategories, closeModalWindow, successMessage, resetDeleteItems) => {
    return dispatch => {
        dispatch(setCategoryFetching(true));
        axios.delete(`${HOST}/api/categories`, {
            params: {
                ids: JSON.stringify(categories.filter(n => n)),
                token: localStorage.getItem("token")
            }
        })
            .then(() => {
                closeModalWindow();
                successMessage("Категорії видалено");
                reloadCategories();
                resetDeleteItems([]);
            })
            .finally(() => {
                dispatch(setCategoryFetching(false));
            });
    };
};

const setCategories = payload => ({
    type: types.SET_CATEGORIES,
    payload,
});

const setCategoriesFetching = (payload) => ({
    type: types.SET_CATEGORIES_FETCHING,
    payload
});

const setCategoryFetching = (payload) => ({
    type: types.SET_CATEGORY_FETCHING,
    payload
});

const setCategoryError = (payload) => ({
    type: types.SET_CATEGORY_ERROR,
    payload
});

const setCategoriesFailure = payload => ({
    type: types.SET_CATEGORIES_FAILURE,
    payload,
});

const deleteCategoryLocaly = payload => ({
    type: types.DELETE_CATEGORY,
    payload,
});

const editCategoryLocaly = payload => ({
    type: types.EDIT_CATEGORY,
    payload,
});