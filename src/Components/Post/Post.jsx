import React, { useEffect, useState } from "react";
import s from "./Post.module.scss";
import { HOST } from "src/config";
import PropTypes from "prop-types";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { ThreeDots } from "svg-loaders-react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost } from "src/state/post/actions";

function Post(props) {

    const id = props.id;

    const moreRef = React.useRef();
    const dispatch = useDispatch();

    const post = props.item;

    const [fetchingDeleting, setFetchingDeleting] = useState(false);

    const handleDelete = () => {
        dispatch(deletePost(post.postId, setFetchingDeleting, setDeleteModalError));
    };

    // MORE MENU
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

    // DELETE MODAL
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteModalError, setDeleteModalError] = useState(false);
    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };
    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };
    // MODAL STYLES
    const useStyles = makeStyles(() => ({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    }));
    const classes = useStyles();

    return (
        <div className={s["post-wrapper"]}>
            <article className={s.post}>
                <header className={s["post__header"]}>
                    <h1 className={s["post__title"]}>{post.title}</h1>
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
                </header>
                <div className={s["post__img"]}>
                    <img src={`${HOST}/api/files/${id}`} alt={`Зображення ${post.title}`} />
                </div>
                <div className={s["post__info"]}>
                    {post.categoryTitle && <h2 className={s["post__category"]}>{post.categoryTitle}</h2>}
                    <div className={s["post__signature"]}>
                        <Link rel="author" className={s["post__author"]} to={`/user/${post.authorId}`}>{`${post.authorName} ${post.authorSurname}`}</Link>
                        <time className={s["post__time"]}>{moment(post["created_at"], "YYYY-MM-DD hh:mm:ss").fromNow()}</time>
                        {post.created_at !== post.updated_at && <sup className={s["post__edited"]} title={`Edited ${moment(post["updated_at"], "YYYY-MM-DD hh:mm:ss").fromNow()}`}>Edited</sup>}
                    </div>
                    {post.description && <div className={s["post__description"]}><p>{post.description}</p></div>}
                </div>
            </article>
        </div>
    );
}

Post.propTypes = {
    item: PropTypes.object,
    id: PropTypes.string
};


export default Post;
