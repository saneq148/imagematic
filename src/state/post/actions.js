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

            })
            .catch((err) => {
                if (!err.response) {
                    dispatch(setError({ title: "На жаль, ця сторінка недоступна.", message: "Посилання, за яким ви перейшли більше недоступне" }));
                }
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };
};


export const deletePost = (id, loading, error) => {
    return (dispatch) => {
        loading(true);
        error(null);
        axios.delete(`${HOST}/api/posts/${id}`, {
            params: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                dispatch(push("/"));
            })
            .catch((err) => {
                console.log(err);
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
    type: types.SET_POST,
    payload
});

const setLoading = (payload) => ({
    type: types.SET_LOADING,
    payload
});

const setError = (payload) => ({
    type: types.SET_ERROR,
    payload
});