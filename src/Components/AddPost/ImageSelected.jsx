import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOriginalImage } from "src/state/addPost/selectors";
import "./ImageSelected.scss";

function ImageSelected() {

    const image = useSelector(getOriginalImage);

    return (
        <div className="image-selected">
            <div className="image-selected__shield"></div>
            <img src={URL.createObjectURL(image)} alt="" />
            <div className="image-selected__title">
                {image.name}
            </div>
            <div className="image-selected__size">
                {image.size}
            </div>
        </div>
    );
}

export default ImageSelected;
