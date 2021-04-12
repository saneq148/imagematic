import React, { useEffect, useRef, useCallback } from "react";
import "./SearchPage.scss";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "src/config";
import { Header } from "src/Components/Header";
import PropTypes from "prop-types";
import PostPreview from "src/Components/Post/PostPreview";
import "src/Components/Home/Posts.scss";
import "src/scss/Content.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getFetching, getError, getHasMore, getPageNumber, getSearchQuery } from "src/state/searchPage/selectors";
import { resetPosts, setPageNumber, fetchPosts, setSearchQuery } from "src/state/searchPage/actions";
import "src/scss/NotFound.scss";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { Loader } from "semantic-ui-react";
import "semantic-ui-css/components/loader.css";

function Search() {

    const dispatch = useDispatch();

    const handleSearch = (query) => {
        dispatch(setSearchQuery(query));
    };
    
    const loading = useSelector(getFetching);
    const posts = useSelector(getPosts);
    const error = useSelector(getError);
    const hasMore = useSelector(getHasMore);
    const pageNumber = useSelector(getPageNumber);
    const search = useSelector(getSearchQuery);

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
    }, [pageNumber, search]);

    useEffect(() => {
        return () => {
            dispatch(resetPosts());
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>{SITE_NAME} - Пошук</title>
            </Helmet>
            <Header />
            <section className="search-page">
            <main className="main-content">
                <div className="container">
                <header className="content-header">
                    <div className="content-header__title">
                        <h1>Пошук</h1>
                    </div>
                </header>
                <div className="content-header__nav">
                    <div className="search-page__nav">
                        <input className="search-page__input" type="text" placeholder="Введіть запит" autoFocus value={search} onChange={(e) => handleSearch(e.target.value)}/>
                    </div>
                </div>
                <div className="posts-wrapper">
                <div className="posts">
                        {
                            posts.map((post, index) => {
                                if (posts.length === index + 1) {
                                    return (
                                        <div className="post-wrapper" ref={lastPostElement} key={post.id}>
                                            <PostPreview post={post} titleToDisplay={post.title} />
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div className="post-wrapper" key={post.id}>
                                            <PostPreview post={post} titleToDisplay={post.title}/>
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
                            <h1>Постів з таким іменем не знайдено</h1>
                            <p>
                                Спробуйте знайти щось інше
                            </p>
                        </div>
                    }
                </div>
                </div>
            </main>
            </section>
        </>
    );
}

Search.propTypes = {
    match: PropTypes.object
};


export default Search;
