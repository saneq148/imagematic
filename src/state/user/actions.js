import axios from "axios";
import { HOST } from "src/config";
import * as types from "./types";
import { push } from "connected-react-router";

export const fetchUserLogin = (login, password, setErrors, setSubmitting) => {
    return dispatch => {
        axios.post(`${HOST}/api/auth/login`, {
            username: login,
            password
        })
            .then(res => {
                dispatch(setUserSuccess(res.data.user));
                localStorage.setItem("token", res.data.token);
                dispatch(push("/"));
            })
            .catch(error => {
                if (!error.response) {
                    setErrors({
                        server: "Сервер недоступний",
                    });
                }
                else if (error.response.data.errors) {
                    setErrors({
                        password: error.response.data.errors.password,
                    });
                }
                else if (error.response.data) {
                    setErrors({
                        login: error.response.data[0].message,
                    });
                }
            })
            .finally(() => {
                setSubmitting(false);
            });

    };
};

export const fetchUserRegister = (username, password, first_name, last_name, phone, setErrors, setSubmitting) => {
    return dispatch => {
        axios.post(`${HOST}/api/auth/register`, {
            username,
            password,
            first_name,
            last_name,
            phone
        }).then((res) => {
            dispatch(setUserSuccess(res.data.user));
            localStorage.setItem("token", res.data.token.token);
            dispatch(push("/"));
        }).catch((err => {
            if (err.response) {
                switch (err.response.data[0].field) {
                    case "username":
                        setErrors({
                            login: err.response.data[0].message,
                        });
                        break;
                    case "password":
                        setErrors({
                            password: err.response.data[0].message,
                        });
                        break;
                    case "first_name":
                        setErrors({
                            firstName: err.response.data[0].message,
                        });
                        break;
                    case "last_name":
                        setErrors({
                            lastName: err.response.data[0].message,
                        });
                        break;
                    case "phone":
                        setErrors({
                            phone: err.response.data[0].message,
                        });
                        break;
                    default:
                        setErrors({
                            server: err.response.data[0].message,
                        });
                        break;
                }
            }
            else {
                setErrors({
                    server: "Сервер недоступний",
                });
            }
        })).finally(() => {
            setSubmitting(false);
        });
    };
};

const setUserSuccess = (payload) => ({
    type: types.SET_USER_SUCCESS,
    payload
});

export const handleLogout = () => {
    return dispatch => {
        dispatch(setLoggedOut());
        localStorage.removeItem("token");
        dispatch(push("/"));
    };
};

const setLoggedOut = () => ({
    type: types.LOGOUT,
});