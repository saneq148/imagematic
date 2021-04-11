import React from "react";
import { HOST } from "src/config";
import PropTypes from "prop-types";
import s from "./PostPreview.module.scss";
import { Link } from "react-router-dom";

const Post = (props) => {

    const item = props.post;

    return (
        <Link to={`/post/${item.id}`} >
            <div className={s.post} key={item.id}>
                <div className={s["post__img"]}>
                    <img src={`${HOST}/api/files/${item.id}`} alt={item.title} />
                </div>
                <h1 className={s["post__category"]}>
                    {item.category && item.category.title}
                </h1>
            </div>
        </Link >);
};

Post.propTypes = {
    post: PropTypes.object
};

export default Post;
