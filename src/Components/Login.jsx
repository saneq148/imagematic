import React, { useState } from "react";
import { Formik } from "formik";
import classnames from "classnames";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import CloseIcon from "@material-ui/icons/Close";
import { Link, Redirect } from "react-router-dom";
import Schema from "./loginValidationSchema";
import loginSubmitHandler from "./loginSubmitHandler";
import { ThreeDots } from "svg-loaders-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from "../state/user/actions";
import { getUserLoggedIn } from "../state/user/selectors";

function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const handleLogin = (
        login,
        password,
        setErrors,
        setSubmitting
    ) => dispatch(
        fetchUserLogin(
            {
                login,
                password,
                setErrors,
                setSubmitting
            }
        )
    );

    return (
        <Formik
            initialValues={{
                login: "",
                password: "",
            }}
            onSubmit={(values, { setErrors, setSubmitting }) => {
                //handleLogin(values.login, values.password, setErrors, setSubmitting);
                //loginSubmitHandler(values, setErrors, setSubmitting, handleLogin);
                dispatch(fetchUserLogin(values.login, values.password, setErrors, setSubmitting));
            }}
            validationSchema={Schema}
        >
            {({ values, errors, handleChange, handleSubmit, isSubmitting, touched, setErrors }) => (
                <main className="auth__content">
                    <header className="auth__header">
                        <div className="auth__logo">
                            <img src="./Logo.png" alt="Логотип Imagematic" />
                        </div>
                        <div className="auth__title">Увійдіть в акаунт</div>
                    </header>
                    <form className="auth__form" onSubmit={handleSubmit} autoComplete="off">
                        {errors.server ? <div className="auth__error"><div className="auth__error-close" onClick={() => setErrors({ server: null })}><CloseIcon fontSize="large" /></div><div className="auth__error-message">Помилка: {errors.server}</div></div> : ""}
                        <div
                            className={classnames(
                                "login-username",
                                "auth__input",
                                {
                                    "placeholder-shown": !values.login,
                                },
                                {
                                    "auth__input--error":
                                        Object.keys(errors)[0] === "login" && touched.login && errors.login,
                                }
                            )}
                        >
                            <input
                                type="text"
                                name="login"
                                id="login"
                                title="Введіть логін, який ви вказали при реєстрації"
                                onChange={handleChange}
                                value={values.login}
                                readOnly={isSubmitting}
                                required
                            />
                            <label className="auth__placeholder" htmlFor="login">
                                Логін
                            </label>
                            {Object.keys(errors)[0] === "login" && touched.login && errors.login ? (
                                <div className="auth__error-message">{errors.login}</div>
                            ) : (
                                    ""
                                )}
                        </div>
                        <div
                            className={classnames(
                                "login-password",
                                "auth__input",
                                {
                                    "placeholder-shown": !values.password,
                                },
                                {
                                    "auth__input--error":
                                        Object.keys(errors)[0] === "password" && touched.password && errors.password,
                                }
                            )}
                        >
                            <label className="auth__show-password" title="Показати пароль">
                                <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
                                {!showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </label>
                            <input
                                type={!showPassword ? "password" : "text"}
                                name="password"
                                id="password"
                                title="Введіть пароль"
                                onChange={handleChange}
                                value={values.password}
                                readOnly={isSubmitting}
                                required
                            />
                            <label className="auth__placeholder" htmlFor="password">
                                Пароль
                            </label>

                            {Object.keys(errors)[0] === "password" && touched.password && errors.password ? (
                                <div className="auth__error-message">{errors.password}</div>
                            ) : (
                                    ""
                                )}
                        </div>
                        <div className="auth__submit">
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <ThreeDots /> : "Увійти"}
                            </button>
                        </div>
                    </form>
                    <footer className="auth__footer">
                        <span className="do-you-have-account">
                            Немає облікового запису? <Link to="/register">Створити</Link>
                        </span>
                    </footer>
                </main>
            )}
        </Formik>
    );
}

export default Login;
