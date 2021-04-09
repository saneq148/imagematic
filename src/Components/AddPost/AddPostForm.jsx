import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getImage, getCategories, getTitle, getDescription, getCategory } from "src/state/addPost/selectors";
import { fetchCategories, setCategory, setTitle, setDescription, setFormErrors } from "src/state/addPost/actions";
import "./AddPostForm.scss";
import { Form, Input, Label } from "semantic-ui-react";
import "semantic-ui-css/components/form.min.css";
import "semantic-ui-css/components/input.min.css";
import "semantic-ui-css/components/dropdown.min.css";
import "semantic-ui-css/components/menu.min.css";
import "semantic-ui-css/components/flag.min.css";
import "semantic-ui-css/components/item.min.css";
import "semantic-ui-css/components/list.min.css";
import "semantic-ui-css/components/search.min.css";
import "semantic-ui-css/components/transition.min.css";
import "semantic-ui-css/components/label.min.css";
import { Formik } from "formik";

function AddPostForm() {

    const image = useSelector(getImage);
    //let categories = [];
    //categories = useSelector(getCategories);
    const title = useSelector(getTitle);
    const description = useSelector(getDescription);
    const category = useSelector(getCategory);

    const [categoriesSearchQuery, setCategoriesSearchQuery] = useState("");

    const [categories, setCategories] = useState([]);

    const categoriesOptions = categories.map(item => {
        return ({
            key: item.id,
            text: item.title,
            value: item.id
        });
    });

    const dispatch = useDispatch();

    const [categoriesFetching, setCategoriesFetching] = useState(false);

    const handleCategoriesSearch = (e, data) => {
        setCategoriesSearchQuery(data.searchQuery);
        dispatch(fetchCategories(categoriesSearchQuery, setCategoriesFetching, setCategories));
    };

    const handleTitleChange = (value) => {
        dispatch(setTitle(value));
    };
    const handleCategoryChange = (value) => {
        dispatch(setCategory(value));
    };
    const handleDescriptionChange = (value) => {
        dispatch(setDescription(value));
    };

    useEffect(() => {
        dispatch(fetchCategories(categoriesSearchQuery, setCategoriesFetching, setCategories));
    }, []);


    return (
        <div className="add-post-form">
            <div className="add-post-form__image">
                <img src={URL.createObjectURL(image)} alt="" />
            </div>
            <div className="add-post-form__form">
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        category: ""
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.title) {
                            errors.title = "Required";
                        }
                        if (!values.category) {
                            errors.category = "Required";
                        }
                        if (Object.keys(errors).length > 0) {
                            dispatch(setFormErrors(true));
                        }
                        else if (Object.keys(errors).length === 0) {
                            dispatch(setFormErrors(false));
                        }
                        return errors;
                    }}
                >
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        touched,
                        errors,
                        validateField,
                        setFieldValue,
                        setFieldTouched
                    }) => (
                        <Form>
                            <Form.Field fluid="true">
                                <label className="add-post-form__label">Заголовок</label>
                                <Input size="huge" placeholder="Введіть заголовок" name="title" error={errors.title && touched.title} value={title} onBlur={handleBlur} onChange={(e, data) => { handleChange(e); handleTitleChange(data.value); }} />
                                {errors.title && touched.title && (
                                    <Label basic color='red' pointing>
                                        {errors.title}
                                    </Label>)}
                            </Form.Field>
                            <Form.Field fluid="true">
                                <label className="add-post-form__label">Категорія</label>
                                {errors.category && touched.category && (
                                    <Label basic color='red' pointing="below">
                                        {errors.category}
                                    </Label>)}
                                <Form.Dropdown placeholder="Виберіть категорію"
                                    search
                                    selection
                                    error={errors.category && touched.category}
                                    loading={categoriesFetching}
                                    options={categoriesOptions}
                                    onSearchChange={handleCategoriesSearch}
                                    value={category}
                                    onBlur={() => { validateField("category"); setFieldTouched("category", true); }}
                                    onChange={(e, data) => { handleCategoryChange(data.value); setFieldValue("category", data.value); }}
                                />
                            </Form.Field>
                            <Form.Field fluid="true">
                                <label className="add-post-form__label">Опис</label>
                                {errors.description && touched.description && (
                                    <Label basic color='red' pointing="below">
                                        {errors.category}
                                    </Label>)}
                                <Form.TextArea size="huge" placeholder="Напишіть кілька слів" style={{ minHeight: 300 }} error={errors.description && touched.description} name="description" onBlur={handleBlur} value={description} onChange={(e, data) => { handleChange(e); handleDescriptionChange(data.value); }} />
                            </Form.Field>
                            <input type="submit" value="submit" hidden />
                        </Form>)}
                </Formik>
            </div>
        </div>
    );
}

export default AddPostForm;
