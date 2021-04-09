import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "src/state/Posts/actions";
import { getPosts, getFetching, getError } from "src/state/Posts/selectors";
import { Post } from "src/Components/Post";
import "src/Components/Home/Posts.scss";
import "src/scss/Content.scss";
import { Loader } from "semantic-ui-react";
import "semantic-ui-css/components/loader.css";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import usePostsload from "src/Components/Home/usePostsLoad";

function Posts() {


    /*const dispatch = useDispatch();

    const posts = useSelector(getPosts);
    const loading = useSelector(getFetching);
    const error = useSelector(getError);

    const load = () => {
        dispatch(fetchPosts());
    };

    useEffect(() => {
        load();
    }, []);*/

    const [pageNumber, setPageNumber] = useState(1);

    const {
        posts,
        hasMore,
        loading,
        error
    } = usePostsload(pageNumber);

    const observer = useRef();
    const lastPostElement = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber((prev) => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const reload = () => {
        setPageNumber(0);
        setPageNumber(1);
    };

    return (
        <section className="posts-page">
            <header className="content-header">
                <div className="content-header__title">
                    <h1>Головна</h1>
                </div>
            </header>
            <div className="content">
                <div className="posts-wrapper">
                    <div className="posts">
                        {
                            posts.map((post, index) => {
                                if (posts.length === index + 1) {
                                    return (
                                        <div className="post-wrapper" ref={lastPostElement}>
                                            <Post key={`${post.id}${post.title}`} post={post} />
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div className="post-wrapper">
                                            <Post key={`${post.id}${post.title}`} post={post} />
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                    <div className="posts-loader">
                        <Loader active={loading} size="large" inline='centered' />
                    </div>
                    {
                        error &&
                        <div className="posts-error">
                            <Alert severity="error"
                                action={
                                    <Button color="inherit" size="big" onClick={reload}>
                                        Спробувати ще раз
                                </Button>
                                }>
                                <div className="error-message">Не вдалося завантажити</div>
                            </Alert>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default Posts;
