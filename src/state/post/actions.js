import * as types from "./types";
import axios from "axios";
import { HOST } from "src/config";
import { push } from "connected-react-router";

export const fetchPost = (id) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(`${HOST}/api/posts/${id}`, {
            params: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                if (res.data.model.category) {
                    dispatch(setPost(res.data.model));
                }
                else if (!res.data.model.category) {
                    dispatch(setPost({
                        ...res.data.model, category: {
                            title: null,
                            id: null
                        }
                    }));
                }
                dispatch(fetchAuthor(res.data.model.created_by));
            })
            .catch((err) => {
                if (!err.response) {
                    dispatch(setError({ title: "На жаль, ця сторінка недоступна.", message: "Посилання, за яким ви перейшли більше недоступне" }));
                }
            })
            .then(() => {
                dispatch(setLoading(false));
            });
    };
};

const fetchAuthor = (id) => {
    return (dispatch) => {
        axios.get(`${HOST}/api/users/${id}`, {
            params: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                dispatch(setAuthor(res.data.model));
            })
            .catch(() => {
                dispatch(setAuthor({ username: "Not Found", first_name: "Not Found", last_name: "Not Found" }));
            });
    };
};

const setAuthor = (payload) => ({
    type: types.SET_POSTPAGE_AUTHOR,
    payload
});


export const deletePost = (id, loading, error) => {
    return (dispatch) => {
        loading(true);
        error(null);
        axios.delete(`${HOST}/api/posts/${id}`, {
            params: {
                token: localStorage.getItem("token")
            }
        })
            .then(() => {
                dispatch(push("/"));
            })
            .catch((err) => {
                if (err.response) {
                    error(err.response.data.error.message);
                }
            })
            .finally(() => {
                loading(false);
            });
    };
};

const setPost = (payload) => ({
    type: types.SET_POSTPAGE_POST,
    payload
});

const setLoading = (payload) => ({
    type: types.SET_POSTPAGE_LOADING,
    payload
});

const setError = (payload) => ({
    type: types.SET_POSTPAGE_ERROR,
    payload
});

export const resetPost = () => ({
    type: types.RESET_POSTPAGE_POST
});