import React from "react";
import { HOST } from "src/config";
import PropTypes from "prop-types";
import s from "./Post.module.scss";
import { Link } from "react-router-dom";
import { Category } from "@material-ui/icons";

const Post = (props) => {

    const item = props.post;

    console.log(item);

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
