import React, { useEffect } from "react";
import Header from "../Header/Header";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "src/config";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, resetPost } from "src/state/post/actions";
import { getPost } from "src/state/post/selectors";
import "src/scss/Content.scss";
import "src/scss/Modal.scss";
import "src/scss/NotFound.scss";
import "src/Components/PostPage/edit.scss";
import { Post } from "src/Components/Post";
import { Link } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import "semantic-ui-css/components/loader.css";

function PostPage(props) {

    const dispatch = useDispatch();

    const id = props.match.params.id;

    const post = useSelector(getPost);

    const load = () => {
        dispatch(fetchPost(id));
    };

    useEffect(() => {
        load();
        return () => {
            dispatch(resetPost());
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>{SITE_NAME} - {post.title ? post.title : "Не знайдено"}</title>
            </Helmet>
            <Header />
            <main className="main-content">
                <div className="container">
                    <section className="categories-page">
                        <div className="content">
                            <div className="container--one-line">
                                {!post.error && !post.loading && <Post item={post} id={id} />}
                                {post.error && !post.loading && <div className="not-found"><h1>{post.error.title}</h1><p>{post.error.message} <Link to="/">Повернутися на головну</Link></p></div>}
                                <div className="posts-loader">
                                    <Loader active={post.loading} size="large" inline='centered' />
                                </div>
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
