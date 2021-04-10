import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Helmet } from "react-helmet";
import { SITE_NAME, HOST } from "src/config";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, deletePost } from "src/state/post/actions";
import { getPost, getFetching, getLoaded } from "src/state/post/selectors";
import "src/scss/Content.scss";
import "src/scss/Modal.scss";
import "src/scss/NotFound.scss";
import "src/Components/PostPage/edit.scss";
import s from "./PostPage.module.scss";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { ThreeDots } from "svg-loaders-react";
import { Link } from "react-router-dom";
import classnames from "classnames";

function PostPage(props) {

    const useStyles = makeStyles(() => ({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    }));
    const classes = useStyles();

    const dispatch = useDispatch();

    const id = props.match.params.id;

    const loading = useSelector(getFetching);
    const loaded = useSelector(getLoaded);
    const post = useSelector(getPost);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteModalError, setDeleteModalError] = useState(false);

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    console.log(post);

    useEffect(() => {

    }, [loading]);

    const load = () => {
        dispatch(fetchPost(id));
    };

    const [fetchingDeleting, setFetchingDeleting] = useState(false);

    const handleDelete = () => {
        dispatch(deletePost(id, setFetchingDeleting, setDeleteModalError));
    };

    useEffect(() => {
        load();
    }, []);

    const moreRef = React.useRef();

    const [visibleMore, setVisibleMore] = useState(false);

    function handleCloseMore(event) {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(moreRef.current)) {
            setVisibleMore(false);
        }
    }

    function handleToggleMore() {
        setVisibleMore(!visibleMore);
    }

    useEffect(() => {
        window.addEventListener("click", handleCloseMore);
        return () => {
            window.removeEventListener("click", handleCloseMore);
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>{SITE_NAME} - Пост</title>
            </Helmet>
            <Header />
            <main className="main-content">
                <div className="container">
                    <section className="categories-page">
                        <div className="content">
                            <div className={s["post-wrapper"]}>
                                {!post.error && <article className={s.post}>
                                    <div className={s["post__info"]}>
                                        <header className={s["post__header"]}>
                                            <h1 className={s["post__title"]}>{loaded && post.title}</h1>
                                            <address rel="author" className={s["post__author"]} >{loaded && post.title}</address>
                                            <div className="post__more">
                                                <div className={classnames(
                                                    "edit",
                                                    { "edit--open": visibleMore }
                                                )} ref={moreRef}>
                                                    <div className="edit__button" onClick={handleToggleMore}>
                                                        <MoreVertIcon />
                                                    </div>
                                                    <div className="edit__menu">
                                                        <ul>
                                                            <li>
                                                                <span onClick={handleOpenDeleteModal}>Видалити</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <Modal
                                                        aria-labelledby="transition-modal-title"
                                                        aria-describedby="transition-modal-description"
                                                        className={classes.modal}
                                                        open={deleteModalOpen}
                                                        onClose={handleCloseDeleteModal}
                                                        closeAfterTransition
                                                        BackdropComponent={Backdrop}
                                                        BackdropProps={{
                                                            timeout: 500,
                                                        }}
                                                    >
                                                        <Fade in={deleteModalOpen}>
                                                            <div className="modal">
                                                                <h1 className="modal__title">Видалити пост</h1>
                                                                <form className="modal__form" onSubmit={(e) => { handleDelete(); e.preventDefault(); }}>
                                                                    {deleteModalError && <div className="modal__error">Помилка: {deleteModalError}</div>}
                                                                    <div className="modal__message">Ви впевнені, що хочете видалити <b>{post.title}</b>?</div>
                                                                    <div className="modal__buttons modal__buttons--center">
                                                                        <button className="modal__close" type="button" onClick={handleCloseDeleteModal}>Назад</button>
                                                                        <button className="modal__submit" type="submit" disabled={fetchingDeleting}>{fetchingDeleting ? <ThreeDots /> : "ОK"}</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </Fade>
                                                    </Modal>
                                                </div>
                                            </div>
                                            {loaded && post.categoryTitle && <h2 className={s["post__category"]}>{loaded && post.categoryTitle}</h2>}
                                        </header>
                                        <div className={s["post__img"]}>
                                            {!loading && (
                                                <img src={`${HOST}/api/files/${id}`} />
                                            )}
                                        </div>
                                        {loaded && post.description && <div className={s["post__description"]}><p>{post.description}</p></div>}
                                    </div>
                                </article>}
                                {post.error && <div className="not-found"><h1>{post.error.title}</h1><p>{post.error.message} <Link to="/">Повернутися на головну</Link></p></div>}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

PostPage.propTypes = {
    match: PropTypes.object
};

export default PostPage;
