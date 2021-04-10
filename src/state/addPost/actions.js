import * as types from "./types";
import axios from "axios";
import { HOST } from "src/config";
import { push } from "connected-react-router";

export const setImage = (payload) => ({
    type: types.SET_IMAGE,
    payload
});

export const setTitle = (payload) => ({
    type: types.SET_TITLE,
    payload
});

export const setDescription = (payload) => ({
    type: types.SET_DESCRIPTION,
    payload
});

export const fetchCategories = (q, loading, setCategories) => {
    return () => {
        loading(true);
        axios.get(`${HOST}/api/categories`, {
            params: {
                page: 1,
                limit: 12,
                orderBy: "title",
                order: "asc",
                q,
                token: localStorage.getItem("token")
            }
        })
            .then(res => {
                setCategories(res.data.data);
            })
            .catch(err => {
                /*if (err.response) {

                } else if (err.request) {

                } else {

                }*/
            })
            .finally(() => {
                loading(false);
            });
    };
};

export const publishPost = (setUploadingProgress) => {
    return (dispatch, getState) => {
        const title = getState().AddPost.title;
        const category = getState().AddPost.category;
        const description = getState().AddPost.description;
        const image = getState().AddPost.image;
        const formErrors = getState().AddPost.formErrors;
        if (formErrors === null || formErrors === true) {
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("category_id", category);
        formData.append("image", image);
        formData.append("token", localStorage.getItem("token"));

        axios.post(`${HOST}/api/posts`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: data => {
                    //Set the progress value to show the progress bar
                    setUploadingProgress(Math.round((100 * data.loaded) / data.total));
                }
            })
            .then((res) => {
                dispatch(push(`/post/${res.data.model.id}`));
            })
            .catch((err) => {
                console.log(err.request);
            })
            .finally(() => {
                setUploadingProgress(null);
            });
    };
};

export const setCategory = (payload) => ({
    type: types.SET_CATEGORY,
    payload
});

export const resetImage = () => ({
    type: types.RESET_IMAGE
});

export const resetForm = () => ({
    type: types.RESET_FORM
});

export const setFormErrors = (payload) => ({
    type: types.SET_FORM_ERRORS,
    payload
});