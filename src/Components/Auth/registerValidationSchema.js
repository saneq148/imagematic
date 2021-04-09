import * as Yup from "yup";

const Schema = Yup.object().shape({
    login: Yup.string().required("Це поле не може бути порожнім!").min(5, "Мінімальна довжина: 5 символів"),
    password: Yup.string()
        .required("Це поле не може бути порожнім!")
        .min(8, "Пароль повинен містити мінімум 8 символів")
        .matches(
            "^(?=.*[a-zіїєґа-я])(?=.*[A-ZІЇЄҐА-Я])",
            "Пароль повинен містити літери верхнього і нижнього регістру"
        ),
    passwordConfirm: Yup.string()
        .when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf([Yup.ref("password")], "Паролі повинні співпадати!"),
        })
        .required("Будь ласка, підтвердіть пароль"),
    firstName: Yup.string().required("Це поле не може бути порожнім!").min(3, "Поле має містити мінімум 3 літери"),
    lastName: Yup.string().required("Це поле не може бути порожнім!").min(3, "Поле має містити мінімум 3 літери"),
    phone: Yup.string()
        .required("Це поле не може бути порожнім!")
        .matches("^\\+(\\d{12})$", "Будь-ласка, введіть номер телефону у форматі: +380991122333"),
});

export default Schema;
