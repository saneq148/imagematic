import axios from "axios";
import { host } from "src/config";

function loginSubmitHandler(values, setErrors, setSubmitting, login) {
    axios
        .post(`${host}/api/auth/login`, {
            username: values.login,
            password: values.password,
        })
        .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token);
            login(response.data.user.id);
        })
        .catch((error) => {
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
                console.log(error.response.data);
                setErrors({
                    login: error.response.data[0].message,
                });
            }
        })
        .finally(() => {
            setSubmitting(false);
        });
}

export default loginSubmitHandler;
