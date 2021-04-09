import * as types from "./types";
import axios from "axios";
import { HOST } from "src/config";

export const fetchPosts = () => {
    return (dispatch) => {
        dispatch(setFetching(true));
        dispatch(setError(null));
        axios.get(`${HOST}/api/posts`, {
            params: {
                page: 1,
                limit: 12,
                orderBy: "id",
                order: "desc",
                q: "",
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                dispatch(setPosts(res.data.data));
            })
            .catch((err) => {
                if (!err.response) {
                    dispatch(setError(err.message));
                }
            })
            .finally(() => {
                dispatch(setFetching(false));
            });
    };
};

const setFetching = (payload) => ({
    type: types.SET_FETCHING,
    payload
});

const setError = (payload) => ({
    type: types.SET_ERROR,
    payload
});

const setPosts = (payload) => ({
    type: types.SET_POSTS,
    payload
});