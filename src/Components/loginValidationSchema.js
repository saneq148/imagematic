import * as Yup from "yup";

const Schema = Yup.object().shape({
    login: Yup.string().required("Це поле не може бути порожнім!").min(5, "Мінімальна довжина: 5 символів"),
    password: Yup.string()
        .required("Це поле не може бути порожнім!")
        .min(8, "Перевірте правильність паролю")
        .matches("^(?=.*[a-zіїєґа-я])(?=.*[A-ZІЇЄҐА-Я])", "Перевірте правильність паролю"),
});

export default Schema;
