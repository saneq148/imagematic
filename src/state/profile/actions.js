import axios from "axios";
import { HOST } from "src/config";
import * as types from "src/state/profile/types";

export const fetchUserProfile = () => {
    return (dispatch, getState) => {
        const id = getState().User.id;
        axios.get(`${HOST}/api/users/${id}`, {
            params: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                dispatch(setUserProfile(res.data.model));
            })
            .catch((err) => {
            })
            .finally(() => {

            });
    };
};

const setUserProfile = (payload) => ({
    type: types.SET_PROFILE,
    payload
});