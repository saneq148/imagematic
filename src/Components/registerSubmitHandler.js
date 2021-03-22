import axios from 'axios';

function RegisterSubmitHandler(values, { setErrors, setSubmitting }, setIsLoggedIn) {
    axios.post('http://127.0.0.1:3333/api/auth/register', {
        username: values.login,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phone
    })
        .then((response) => {
            localStorage.setItem('token', response.data.token.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setSubmitting(false);
            setIsLoggedIn(true);
        })
        .catch((error) => {
            if (error.response) {
                switch (error.response.data[0].field) {
                    case 'username':
                        setErrors({ login: error.response.data[0].message });
                        break;
                    case 'password':
                        setErrors({ password: error.response.data[0].message });
                        break;
                    case 'first_name':
                        setErrors({ firstName: error.response.data[0].message });
                        break;
                    case 'last_name':
                        setErrors({ lastName: error.response.data[0].message });
                        break;
                    case 'phone':
                        setErrors({ phone: error.response.data[0].message });
                        break;
                    default:
                        setErrors({ server: error.response.data[0].message });
                        break;
                }
            }
            else if (!error.response) {
                setErrors({ server: 'Сервер недоступний' });
            }
            setSubmitting(false);
        });
}

export default RegisterSubmitHandler;