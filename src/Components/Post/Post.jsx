import React from "react";
import { HOST } from "src/config";
import PropTypes from "prop-types";
import "./Post.scss";
import { Link } from "react-router-dom";

const Post = (props) => {

    const item = props.post;

    return (
        <Link to={`/post/${item.id}`} >
            <div className="post" key={item.id}>
                <div className="post__img">
                    <img src={`${HOST}/api/files/${item.id}`} alt={item.title} />
                </div>
                <h1 className="post__title">
                    {item.title}
                </h1>
            </div>
        </Link >);
};

Post.propTypes = {
    post: PropTypes.object
};

export default Post;
