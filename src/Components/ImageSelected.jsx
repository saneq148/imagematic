import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { getImage } from "src/state/addPost/selectors";

function ImageSelected() {

    const image = useSelector(getImage);

    return (
        <div className="image-selected">
            <div className="image-selected__edit">
                <EditIcon />
            </div>
            <div className="image-selected__close">
                <CloseIcon />
            </div>
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
