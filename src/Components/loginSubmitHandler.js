import axios from 'axios';

function loginSubmitHandler(values, setErrors, setSubmitting, setIsLoggedIn) {
    axios.post('http://127.0.0.1:3333/api/auth/login', {
        username: values.login,
        password: values.password
    })
        .then((response) => {
            localStorage.setItem('token', response.data.token.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setSubmitting(false);
            setIsLoggedIn(true);
        })
        .catch((error) => {
            if (error.response) {
                setErrors({
                    login: error.response.data.errors.login,
                    password: error.response.data.errors.password
                });
            }
            else if (!error.response) {
                setErrors({ server: 'Сервер недоступний' });
            }
            setSubmitting(false);
        });
}

export default loginSubmitHandler;