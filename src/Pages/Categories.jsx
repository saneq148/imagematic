import React, { useState, useEffect } from "react";
import { Header } from "../Components";
import "./Categories.scss";
import "src/Components/Content.scss";
import "./Modal.scss";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Pagination from "@material-ui/lab/Pagination";
import { Skeleton } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    getCategoriesError,
    getCategoriesFetching,
    getCategoriesCurrentPage,
    getCategoryFetching,
    getCategoriesLoaded,
    getCategoriesPagesCount,
    getCategoriesBigLayout
} from "src/state/categories/selectors";
import { fetchCategories, addCategory, deleteCategory, editCategory, setCurrentPage, setBigLayout } from "src/state/categories/actions";
import { ThreeDots } from "svg-loaders-react";
import { Dropdown, Input, Button, Loader, Message } from "semantic-ui-react";
import "semantic-ui-css/components/dropdown.min.css";
import "semantic-ui-css/components/input.min.css";
import "semantic-ui-css/components/icon.min.css";
import "semantic-ui-css/components/menu.min.css";
import "semantic-ui-css/components/transition.min.css";
import "semantic-ui-css/components/button.min.css";
import "semantic-ui-css/components/form.min.css";
import "semantic-ui-css/components/label.min.css";
import "semantic-ui-css/components/grid.min.css";
import "semantic-ui-css/components/checkbox.min.css";
import "semantic-ui-css/components/message.min.css";
import classnames from "classnames";
import Checkbox from "src/Components/Checkbox";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "src/config";


function Categories() {

    const dispatch = useDispatch();
    const loadCategories = () => dispatch(fetchCategories(quantity, order, orderBy, query));

    const items = useSelector(getCategories);
    const error = useSelector(getCategoriesError);
    const currentPage = useSelector(getCategoriesCurrentPage);
    const pagesCount = useSelector(getCategoriesPagesCount);
    const fetchingCategories = useSelector(getCategoriesFetching);
    const fetchingCategory = useSelector(getCategoryFetching);
    const bigIcons = useSelector(getCategoriesBigLayout);

    // FILTERS
    const [query, setQuery] = useState("");
    const [quantity, setQuantity] = useState(12);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("title");

    useEffect(() => {
        loadCategories();
    }, [currentPage, bigIcons, query, quantity, order, orderBy]);

    // MODAL
    const [addNewItemModalOpen, setaddNewItemModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItemTitle, setSelectedItemTitle] = useState(null);
    const [addNewItemTitle, setAddNewItemTitle] = useState("");

    // MODAL STYLES
    const useStyles = makeStyles(() => ({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    }));
    const classes = useStyles();

    const useBigIcons = () => {
        dispatch(setBigLayout(true));
        setQuantity(6);
    };

    const useSmallIcons = () => {
        dispatch(setBigLayout(false));
        setQuantity(12);
    };

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
        setAddNewItemTitle(null);
    };

    const handleAddNewItemClose = () => {
        setaddNewItemModalOpen(false);
        setAddNewItemTitle(null);
    };

    const setCurrentPageHandler = (event, value) => {
        dispatch(setCurrentPage(value));
    };

    const addNewItemSubmit = (e) => {
        e.preventDefault();
        dispatch(addCategory(addNewItemTitle, loadCategories, handleAddNewItemClose));
    };

    const deleteItem = (id) => {
        dispatch(deleteCategory(id, loadCategories, handleDeleteModalClose));
    };

    const editItem = (id, title) => {
        dispatch(editCategory(id, title, handleEditModalClose));
    };

    const orderOptions = [
        {
            key: "asc",
            text: "Початку",
            value: "asc",
        },
        {
            key: "desc",
            text: "Кінця",
            value: "desc",
        }
    ];
    const orderByOptions = [
        {
            key: "title",
            text: "Імені",
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

    const handleOrderChange = (e, data) => {
        setOrder(data.value);
    };
    const handleOrderByChange = (e, data) => {
        setOrderBy(data.value);
    };
    const handleSearchChange = (e, data) => {
        setQuery(data.value);
    };

    return (
        <>
            <Helmet>
                <title>{SITE_NAME} - Категорії</title>
            </Helmet>
            <Header />
            <main className="main-content">
                <div className="container">
                    <section className="categories-page">
                        <header className="content-header">
                            <div className="content-header__title">
                                <h1>Категорії</h1>
                            </div>
                            <div className="content-header__nav">
                                <div className="add-new-category">
                                    <Button icon="add" content="Додати категорію" size="massive" color="green" onClick={() => setaddNewItemModalOpen(true)} />
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={addNewItemModalOpen}
                                        onClose={handleAddNewItemClose}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={addNewItemModalOpen}>
                                            <div className="modal">
                                                <h1 className="modal__title">Додати нову категорію</h1>
                                                <form className="modal__form" onSubmit={(e) => { addNewItemSubmit(e); }}>
                                                    <div className="modal__input">
                                                        <label htmlFor="category_add">Назва</label>
                                                        <input type="text" minLength="1" autoFocus readOnly={fetchingCategory} required placeholder="Введіть назву категорії" id="category_add" value={addNewItemTitle} onChange={(e) => setAddNewItemTitle(e.target.value)} />
                                                    </div>
                                                    <div className="modal__buttons">
                                                        <button className="modal__close" type="button" onClick={handleAddNewItemClose}>Назад</button>
                                                        <button className="modal__submit" type="submit" disabled={fetchingCategory}>{fetchingCategory ? <ThreeDots /> : "Додати"}</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Fade>
                                    </Modal>
                                </div>
                                <form className="filters" onSubmit={(e) => e.preventDefault()}>
                                    <div className="filters__view">
                                        <Button basic icon="block layout" size="huge" active={bigIcons} onClick={useBigIcons}></Button>
                                        <Button basic icon="list layout" size="huge" active={!bigIcons} onClick={useSmallIcons}></Button>
                                    </div>
                                    <div className="filters__input">
                                        <div className="filters__field">
                                            <Input
                                                icon="search"
                                                placeholder="Введіть назву категорії"
                                                value={query}
                                                onChange={handleSearchChange} />
                                        </div>
                                        <div className="filters__group">
                                            <div className="filters__field">
                                                <label>Сортувати по</label>
                                                <Dropdown
                                                    placeholder="Сортувати по"
                                                    selection
                                                    compact
                                                    options={orderByOptions}
                                                    defaultValue={orderByOptions[0].value}
                                                    name="orderBy"
                                                    onChange={handleOrderByChange}
                                                    className="column"
                                                />
                                            </div>
                                            <div className="filters__field">
                                                <label>Сортувати з</label>
                                                <Dropdown
                                                    placeholder="Сортувати з"
                                                    selection
                                                    compact
                                                    options={orderOptions}
                                                    defaultValue={orderOptions[0].value}
                                                    name="order"
                                                    onChange={handleOrderChange}
                                                    className="column"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </header>
                        <ul className={classnames("categories", {
                            "categories--big": bigIcons,
                            "categories--small": !bigIcons
                        })}>
                            {fetchingCategories
                                ? Array(items.length).fill(null).map((u, i) => {
                                    return (
                                        <li className="category category--loading" key={i}>
                                            <div className="category__edit">
                                                <Skeleton variant="rect" animation="wave" />
                                            </div>
                                            <div className="category__date">
                                                <Skeleton variant="rect" animation="wave" />
                                            </div>
                                            <div className="category__delete">
                                                <Skeleton variant="circle" animation="wave" />
                                            </div>
                                            <div className="category__title">
                                                <Skeleton variant="rect" animation="wave" />
                                            </div>
                                            <div className="category__checkbox">
                                                <Skeleton variant="rect" animation="wave" />
                                            </div>
                                        </li>);
                                })
                                : items.map((item) => {
                                    return <li className="category" key={item.id}>
                                        <div className="category__edit" title="Редагувати" onClick={() => handleEditModalOpen(item.id, item.title)}>
                                            <EditIcon />
                                        </div>
                                        <div className="category__date">
                                            <time dateTime={item["created_at"]} title={`Створено ${item["created_at"]}`}>Updated {moment(item["created_at"], "YYYY-MM-DD hh:mm:ss").fromNow()}</time>
                                        </div>
                                        <div className="category__delete" title="Видалити категорію" onClick={() => handleDeleteModalOpen(item.id, item.title)}>
                                            <DeleteIcon />
                                        </div>
                                        <div className="category__title">
                                            <span>{item.title}</span>
                                        </div>
                                        <div className="category__checkbox">
                                            <Checkbox />
                                        </div>
                                    </li>;
                                })}
                            {items.length < 1 && !error && !fetchingCategories ? <div className="categories-placeholder"><h1>Категорії не знайдено</h1></div> : null}
                            {error && <Message negative>
                                <Message.Header>Сталася помилка:</Message.Header>
                                <p>{error}</p>
                            </Message>}
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
                                                <button className="modal__submit" type="submit" disabled={fetchingCategory}>{fetchingCategory ? <ThreeDots /> : "ОK"}</button>
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
                                        <h1 className="modal__title">Редагувати категорію {selectedItemTitle}</h1>
                                        <form className="modal__form" onSubmit={(e) => { editItem(selectedItemId, addNewItemTitle); e.preventDefault(); }}>
                                            <div className="modal__input">
                                                <label htmlFor="category_edit">Назва</label>
                                                <input type="text" minLength="1" autoFocus readOnly={fetchingCategory} placeholder="Введіть нову назву" required id="category_edit" value={addNewItemTitle} onChange={(e) => setAddNewItemTitle(e.target.value)} />
                                            </div>
                                            <div className="modal__buttons">
                                                <button className="modal__close" type="button" onClick={handleEditModalClose}>Назад</button>
                                                <button className="modal__submit" type="submit" disabled={fetchingCategory}>{fetchingCategory ? <ThreeDots /> : "ОK"}</button>
                                            </div>
                                        </form>
                                    </div>
                                </Fade>
                            </Modal>
                        </ul>
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
