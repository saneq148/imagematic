import React, { useState, useEffect } from "react";
import { Header } from "../Components";
import "./Categories.scss";
import "./Modal.scss";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Formik } from "formik";
import axios from "axios";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "src/state/categories/selectors";
import { setCategories, deleteCategory, editCategory } from "src/state/categories/actions";
import { ThreeDots } from "svg-loaders-react";
import { Skeleton } from "@material-ui/lab";
import { Dropdown, Input, Button, Form } from "semantic-ui-react";
import "semantic-ui-css/components/dropdown.min.css";
import "semantic-ui-css/components/input.min.css";
import "semantic-ui-css/components/icon.min.css";
import "semantic-ui-css/components/menu.min.css";
import "semantic-ui-css/components/transition.min.css";
import "semantic-ui-css/components/button.min.css";
import "semantic-ui-css/components/form.min.css";
import "semantic-ui-css/components/label.min.css";
import { host } from "src/config";


function Categories() {

    const dispatch = useDispatch();

    const items = useSelector(getCategories);

    const useStyles = makeStyles(() => ({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    }));

    const classes = useStyles();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItemTitle, setSelectedItemTitle] = useState(null);
    const [addNewItemModal, setAddNewItemModal] = useState(false);
    const [addNewItemTitle, setAddNewItemTitle] = useState("");
    const [fetchingCategories, setFetchingCategories] = useState(false);
    const [fetchCategory, setFetchCategory] = useState(false);

    const handleDeleteModalOpen = (id, title) => {
        setDeleteModalOpen(true);
        setSelectedItemId(id);
        setSelectedItemTitle(title);
    };

    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
        setSelectedItemId(null);
    };

    const handleEditModalOpen = (id, title) => {
        setEditModalOpen(true);
        setSelectedItemId(id);
        setSelectedItemTitle(title);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setSelectedItemId(null);
        setSelectedItemTitle(null);
    };

    const handleAddNewItemClose = () => {
        setAddNewItemModal(false);
    };

    const [query, setQuery] = useState("");
    const [order, setOrder] = useState("asc");
    const [quantity, setQuantity] = useState(6);
    const [orderBy, setOrderBy] = useState("created_at");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(0);

    const setCurrentPageHandler = (event, value) => {
        setCurrentPage(value);
    };


    useEffect(() => {
        fetchCategories();
    }, [currentPage]);

    function fetchCategories() {
        if (currentPage > pagesCount) {
            setCurrentPage(1);
        }
        setFetchingCategories(true);
        axios.get(`${host}/api/categories`, {
            params: {
                page: currentPage,
                limit: quantity,
                orderBy: orderBy,
                order: order,
                q: query,
                token: localStorage.getItem("token")
            }
        })
            .then((response) => {
                dispatch(setCategories(response.data.data));
                setPagesCount(response.data.lastPage);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setFetchingCategories(false);
            });
    }

    const addNewItemSubmit = () => {
        setFetchCategory(true);
        axios.post(`${host}/api/categories`, {
            title: addNewItemTitle,
            token: localStorage.getItem("token")
        })
            .then(() => {
                fetchCategories();
                handleAddNewItemClose();
            })
            .catch(e => console.log(e))
            .finally(() => {
                setAddNewItemTitle("");
                setFetchCategory(false);
            });
    };

    const deleteItem = (id) => {
        setFetchCategory(true);
        axios.delete(`${host}/api/categories/` + id, {
            params: {
                token: localStorage.getItem("token")
            }
        })
            .then(() => {
                dispatch(deleteCategory(id));
                fetchCategories();
                handleDeleteModalClose();
            })
            .finally(() => {
                setFetchCategory(false);
            });


    };

    const editItem = (id, title) => {
        setFetchCategory(true);
        axios.put(`${host}/api/categories/` + id, {
            title: title,
            token: localStorage.getItem("token")
        })
            .then(() => {
                dispatch(editCategory({ id, title }));
                handleEditModalClose();
            })
            .finally(() => {
                setFetchCategory(false);
            });
    };

    const orderOptions = [
        {
            key: "asc",
            text: "З початку",
            value: "asc",
        },
        {
            key: "desc",
            text: "З кінця",
            value: "desc",
        }
    ];
    const orderByOptions = [
        {
            key: "title",
            text: "По імені",
            value: "title",
        },
        {
            key: "created_at",
            text: "Дата створення",
            value: "created_at",
        },
        {
            key: "updated_at",
            text: "Дата редагування",
            value: "updated_at",
        },
    ];

    const quantityOptions = [
        {
            key: "6",
            text: "6",
            value: 6,
        },
        {
            key: "4",
            text: "4",
            value: 4,
        },
        {
            key: "8",
            text: "8",
            value: 8,
        },
        {
            key: "10",
            text: "10",
            value: 10,
        },
        {
            key: "12",
            text: "12",
            value: 12,
        },
    ];

    const handleOrderChange = (e, data) => {
        setOrder(data.value);
        fetchCategories();
    };
    const handleOrderByChange = (e, data) => {
        setOrderBy(data.value);
        fetchCategories();
    };

    const handleQuantityChange = (e, data) => {
        setQuantity(Number(data.value));
        fetchCategories();
    };
    const handleSearchChange = (e, data) => {
        setQuery(data.value);
        fetchCategories();
    };

    return (
        <>
            <Header />
            <main className="main-content">
                <div className="container">
                    <section className="categories-page">
                        <header className="page-title">
                            <h1>Категорії</h1>
                        </header>
                        <form className="filters" onSubmit={(e) => e.preventDefault()}>
                            <div className="filters__input">
                                <Form.Group widths='equal'>
                                    <label>Пошук</label>
                                    <Form.Field>
                                        <Input
                                            loading={fetchingCategories}
                                            placeholder="Введіть назву категорії"
                                            value={query}
                                            onChange={handleSearchChange}
                                            action={
                                                <Dropdown placeholder="Кількість"
                                                    selection
                                                    fluid
                                                    options={quantityOptions}
                                                    name="quantity"
                                                    onChange={handleQuantityChange} />}>

                                        </Input>
                                    </Form.Field>
                                </Form.Group>

                            </div>
                            <div className="filters__order">
                                <label>Фільтри</label>
                                <div>
                                    <Dropdown
                                        placeholder="Сортувати з"
                                        selection
                                        compact
                                        options={orderOptions}
                                        name="order"
                                        onChange={handleOrderChange}
                                        className="column"
                                    />
                                    <Dropdown
                                        placeholder="Сортувати по"
                                        selection
                                        compact
                                        options={orderByOptions}
                                        name="orderBy"
                                        onChange={handleOrderByChange}
                                        className="column"
                                    />
                                </div>
                            </div>
                            <div className="filters__order_by">
                            </div>
                        </form>
                        <div className="add-new-category">
                            <Button icon="add" content="Додати нову категорію" size="massive" color="green" onClick={() => setAddNewItemModal(true)} />
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={addNewItemModal}
                                onClose={handleAddNewItemClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={addNewItemModal}>
                                    <div className="modal">
                                        <h1 className="modal__title">Додати нову категорію</h1>
                                        <form className="modal__form" onSubmit={(e) => { addNewItemSubmit(); e.preventDefault(); }}>
                                            <div className="modal__input">
                                                <label htmlFor="category_add">Назва</label>
                                                <input type="text" minLength="1" readOnly={fetchCategory} required placeholder="Введіть назву категорії" id="category_add" value={addNewItemTitle} onChange={(e) => setAddNewItemTitle(e.target.value)} />
                                            </div>
                                            <div className="modal__buttons">
                                                <button className="modal__close" type="button" onClick={handleAddNewItemClose}>Назад</button>
                                                <button className="modal__submit" type="submit" disabled={fetchCategory}>{fetchCategory ? <ThreeDots /> : "Додати"}</button>
                                            </div>
                                        </form>
                                    </div>
                                </Fade>
                            </Modal>
                        </div>
                        <div className="categories">
                            {fetchingCategories
                                ? Array(quantity).fill(null).map((u, i) => {
                                    return (
                                        <div className="category category--loading" key={i}>
                                            <Skeleton variant="rect" animation="wave" />
                                        </div>);
                                })
                                : items.map((item) => {
                                    return <div className="category" key={item.id}>
                                        <div className="category__edit" title="Редагувати" onClick={() => handleEditModalOpen(item.id, item.title)}>
                                            <EditIcon />
                                        </div>
                                        <div className="category__date">
                                            <time dateTime={item["updated_at"]}>{moment(item["created_at"], "YYYY-MM-DD hh:mm:ss").fromNow()}</time>
                                        </div>
                                        <div className="category__delete" title="Видалити категорію" onClick={() => handleDeleteModalOpen(item.id, item.title)}>
                                            <DeleteIcon />
                                        </div>
                                        <div className="category__title">
                                            <span>{item.title}</span>
                                        </div>
                                    </div>;
                                })}
                            {items.length < 1 ? <div className="categories-placeholder"><h1>Категорії не знайдено</h1></div> : null}
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={deleteModalOpen}
                                onClose={handleDeleteModalClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={deleteModalOpen}>
                                    <div className="modal">
                                        <h1 className="modal__title">Видалити категорію</h1>
                                        <form className="modal__form" onSubmit={(e) => { deleteItem(selectedItemId); e.preventDefault(); }}>
                                            <div className="modal__message">Ви впевнені, що хочете видалити категорію <b>{selectedItemTitle}</b>?</div>
                                            <div className="modal__buttons modal__buttons--center">
                                                <button className="modal__close" type="button" onClick={handleDeleteModalClose}>Назад</button>
                                                <button className="modal__submit" type="submit" disabled={fetchCategory}>{fetchCategory ? <ThreeDots /> : "ОK"}</button>
                                            </div>
                                        </form>
                                    </div>
                                </Fade>
                            </Modal>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={editModalOpen}
                                onClose={handleEditModalClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={editModalOpen}>
                                    <div className="modal">
                                        <h1 className="modal__title">Редагувати категорію</h1>
                                        <form className="modal__form" onSubmit={(e) => { editItem(selectedItemId, selectedItemTitle); e.preventDefault(); }}>
                                            <div className="modal__input">
                                                <label htmlFor="category_edit">Назва</label>
                                                <input type="text" minLength="1" readOnly={fetchCategory} placeholder="Введіть нову назву" required id="category_edit" value={selectedItemTitle} onChange={(e) => setSelectedItemTitle(e.target.value)} />
                                            </div>
                                            <div className="modal__buttons">
                                                <button className="modal__close" type="button" onClick={handleEditModalClose}>Назад</button>
                                                <button className="modal__submit" type="submit" disabled={fetchCategory}>{fetchCategory ? <ThreeDots /> : "ОK"}</button>
                                            </div>
                                        </form>
                                    </div>
                                </Fade>
                            </Modal>
                        </div>
                        <div className="categoires-pagination">
                            {pagesCount > 1 ? <Pagination count={pagesCount} page={currentPage} onChange={setCurrentPageHandler} hidePrevButton hideNextButton /> : ""}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Categories;
