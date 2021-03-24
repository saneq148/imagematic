import React, { useState } from "react";
import { Formik } from "formik";
import classnames from "classnames";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Link, Redirect } from "react-router-dom";
import Schema from "./registerValidationSchema";
import { ThreeDots } from "svg-loaders-react";
import RegisterSubmitHandler from "./registerSubmitHandler";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    if (isLoggedIn) {
        window.location.reload();
        return (
            <Redirect
                push
                to={{
                    pathname: "/",
                }}
            />
        );
    }

    return (
        <Formik
            initialValues={{
                login: "",
                password: "",
                passwordConfirm: "",
                firstName: "",
                lastName: "",
                phone: "",
            }}
            onSubmit={(values, { setErrors, setSubmitting }) => {
                RegisterSubmitHandler(
                    values,
                    {
                        setErrors,
                        setSubmitting,
                    },
                    setIsLoggedIn
                );
            }}
            validationSchema={Schema}
        >
            {({ values, errors, handleChange, handleSubmit, touched, isSubmitting }) => (
                <main className="auth__content">
                    <header className="auth__header">
                        <div className="auth__logo">
                            <img src="./Logo.png" alt="Логотип Imagematic" />
                        </div>
                        <div className="auth__title">Створіть новий профіль</div>
                    </header>
                    <form className="auth__form" onSubmit={handleSubmit} autoComplete="off">
                        {errors.server ? (
                            <div className="auth__error">Помилка: {JSON.stringify(errors.server)}</div>
                        ) : (
                            ""
                        )}
                        <div
                            className={classnames(
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
                                title="Введіть логін"
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
                                {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </label>
                            <input
                                type={!showPassword ? "password" : "text"}
                                name="password"
                                id="password"
                                title="Введіть пароль, який містить літери верхнього і нижнього регістру"
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
                        <div
                            className={classnames(
                                "auth__input",
                                {
                                    "placeholder-shown": !values.passwordConfirm,
                                },
                                {
                                    "auth__input--error":
                                        Object.keys(errors)[0] === "passwordConfirm" &&
                                        touched.passwordConfirm &&
                                        errors.passwordConfirm,
                                }
                            )}
                        >
                            <input
                                type={!showPassword ? "password" : "text"}
                                name="passwordConfirm"
                                id="passwordConfirm"
                                title="Підтвердіть пароль, який ви ввели вище"
                                onChange={handleChange}
                                value={values.passwordConfirm}
                                readOnly={isSubmitting}
                                required
                            />
                            <label className="auth__placeholder" htmlFor="passwordConfirm">
                                Підтвердження паролю
                            </label>
                            {Object.keys(errors)[0] === "passwordConfirm" &&
                            touched.passwordConfirm &&
                            errors.passwordConfirm ? (
                                <div className="auth__error-message">{errors.passwordConfirm}</div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div
                            className={classnames(
                                "auth__input",
                                {
                                    "placeholder-shown": !values.firstName,
                                },
                                {
                                    "auth__input--error":
                                        Object.keys(errors)[0] === "firstName" && touched.firstName && errors.firstName,
                                }
                            )}
                        >
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                title="Введіть ваше ім’я"
                                onChange={handleChange}
                                value={values.firstName}
                                readOnly={isSubmitting}
                                required
                            />
                            <label className="auth__placeholder" htmlFor="firstName">
                                Ім’я
                            </label>
                            {Object.keys(errors)[0] === "firstName" && touched.firstName && errors.firstName ? (
                                <div className="auth__error-message">{errors.firstName}</div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div
                            className={classnames(
                                "auth__input",
                                {
                                    "placeholder-shown": !values.lastName,
                                },
                                {
                                    "auth__input--error":
                                        Object.keys(errors)[0] === "lastName" && touched.lastName && errors.lastName,
                                }
                            )}
                        >
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                title="Введіть ваше прізвище"
                                onChange={handleChange}
                                value={values.lastName}
                                readOnly={isSubmitting}
                                required
                            />
                            <label className="auth__placeholder" htmlFor="lastName">
                                Прізвище
                            </label>
                            {Object.keys(errors)[0] === "lastName" && touched.lastName && errors.lastName ? (
                                <div className="auth__error-message">{errors.lastName}</div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div
                            className={classnames(
                                "auth__input",
                                {
                                    "placeholder-shown": !values.phone,
                                },
                                {
                                    "auth__input--error":
                                        Object.keys(errors)[0] === "phone" && touched.phone && errors.phone,
                                }
                            )}
                        >
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                title="Введіть ваш номер телефону в форматі: +380112233444"
                                onChange={handleChange}
                                value={values.phone}
                                readOnly={isSubmitting}
                                required
                            />
                            <label className="auth__placeholder" htmlFor="phone">
                                Номер телефону
                            </label>
                            {Object.keys(errors)[0] === "phone" && touched.phone && errors.phone ? (
                                <div className="auth__error-message">{errors.phone}</div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="auth__submit">
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <ThreeDots /> : "Зареєструватися"}
                            </button>
                        </div>
                    </form>
                    <footer className="auth__footer">
                        <span className="do-you-have-account">
                            Вже маєте обліковий запис? <Link to="/login">Увійти</Link>
                        </span>
                    </footer>
                </main>
            )}
        </Formik>
    );
}

export default Register;
