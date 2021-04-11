import React, { useEffect, useState, useRef, useCallback } from "react";
import "./SearchPage.scss";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "src/config";
import { Header } from "src/Components/Header";
import PropTypes from "prop-types";
import useSearchLoad from "./useSearchLoad";
import PostPreview from "src/Components/Post/PostPreview";
import "src/Components/Home/Posts.scss";
import "src/scss/Content.scss";

function Search(props) {

    const searchQuery = props.match.params.query;

    const [pageNumber, setPageNumber] = useState(1);

    const {
        posts,
        hasMore,
        loading,
        error
    } = useSearchLoad(pageNumber, searchQuery);

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
                <div className="posts-wrapper">
                <div className="posts">
                        {
                            posts.map((post, index) => {
                                if (posts.length === index + 1) {
                                    return (
                                        <div className="post-wrapper" ref={lastPostElement} key={post.id}>
                                            <PostPreview post={post} />
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div className="post-wrapper" key={post.id}>
                                            <PostPreview post={post} />
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
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
