import * as types from "./types";
import axios from "axios";
import { HOST } from "src/config";

export const fetchPosts = () => {
    return (dispatch, getState) => {
        if (!getState().Posts.hasMore) return;
        const page = getState().Posts.pageNumber + 1;
        dispatch(setFetching(true));
        dispatch(setError(null));
        let cancel;
        axios({
            method: "GET",
            url: `${HOST}/api/posts`,
            params: {
                page,
                limit: 12,
                orderBy: "id",
                order: "desc",
                q: "",
                token: localStorage.getItem("token")
            },
            cancelToken: new axios.CancelToken((c) => cancel = c)
        })
            .then((res) => {
                dispatch(setPosts(res.data.data));
                dispatch(setHasMore(res.data.lastPage > res.data.page));
            })
            .catch((e) => {
                if (axios.isCancel(e)) return;
                dispatch(setError(true));
            })
            .finally(() => {
                dispatch(setFetching(false));
            });
        return () => cancel();
    };
};

export const setPageNumber = (payload) => ({
    type: types.SET_PAGE_NUMBER,
    payload
});

const setFetching = (payload) => ({
    type: types.SET_FETCHING,
    payload
});

const setError = (payload) => ({
    type: types.SET_ERROR,
    payload
});

const setHasMore = (payload) => ({
    type: types.SET_HAS_MORE,
    payload
});

const setPosts = (payload) => ({
    type: types.SET_POSTS,
    payload
});

export const resetPosts = () => ({
    type: types.RESET_POSTS,
});