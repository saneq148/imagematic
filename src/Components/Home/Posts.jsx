import React, { useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostPreview } from "src/Components/Post";
import "src/Components/Home/Posts.scss";
import "src/scss/Content.scss";
import { Loader } from "semantic-ui-react";
import "semantic-ui-css/components/loader.css";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { getPosts, getFetching, getError, getHasMore, getPageNumber } from "src/state/posts/selectors";
import { resetPosts, setPageNumber, fetchPosts } from "src/state/posts/actions";
import { Link } from "react-router-dom";
import "src/scss/NotFound.scss";
import "./Home.scss";
import SearchIcon from "@material-ui/icons/Search";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

function Posts() {

    const dispatch = useDispatch();

    const loading = useSelector(getFetching);
    const posts = useSelector(getPosts);
    const error = useSelector(getError);
    const hasMore = useSelector(getHasMore);
    const pageNumber = useSelector(getPageNumber);

    const observer = useRef();
    const lastPostElement = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                dispatch(setPageNumber(pageNumber + 1));
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const loadPosts = () => {
        dispatch(fetchPosts(pageNumber));
    };

    useEffect(() => {
        loadPosts();
    }, [pageNumber]);

    useEffect(() => {
        return () => {
            dispatch(resetPosts());
        };
    }, []);

    return (
        <section className="homepage">
            <header className="content-header">
                <div className="content-header__title">
                    <h1>Головна</h1>
                </div>
            </header>
            <div className="content">
                <div className="content-header__nav">
                    <div className="homepage__nav">
                        <Link to="/search" className="homepage__search-btn">
                            <span>Пошук</span>
                            <SearchIcon />
                        </Link>
                        <Link to="/add" className="homepage__add-btn">
                            <LibraryAddIcon />
                            <span>Додати</span>
                        </Link>
                    </div>
                </div>
                <div className="posts-wrapper">
                    <div className="posts">
                        {
                            posts.map((post, index) => {
                                if (posts.length === index + 1) {
                                    return (
                                        <div className="post-wrapper" ref={lastPostElement} key={post.id}>
                                            <PostPreview post={post} titleToDisplay={post.category ? post.category.title : post.title}/>
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div className="post-wrapper" key={post.id}>
                                            <PostPreview post={post} titleToDisplay={post.category ? post.category.title : post.title}/>
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
                                    <Button color="inherit" size="large" onClick={loadPosts}>
                                        Спробувати ще раз
                                    </Button>
                                }>
                                <div className="error-message">Не вдалося завантажити</div>
                            </Alert>
                        </div>
                    }
                    { 
                        !error && !loading && posts.length === 0 && 
                        <div className="not-found">
                            <h1>Постів поки немає</h1>
                            <p>
                                Будьте першим: <Link to="/add">створити пост</Link>
                            </p>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default Posts;
