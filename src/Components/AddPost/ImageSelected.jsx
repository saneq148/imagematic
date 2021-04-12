import React from "react";
import { useSelector } from "react-redux";
import { getOriginalImage } from "src/state/addPost/selectors";
import "./ImageSelected.scss";
import UndoIcon from "@material-ui/icons/Undo";
import { useDispatch } from "react-redux";
import { resetImage } from "src/state/addPost/actions";
import PropTypes from "prop-types";
import "src/scss/Content.scss";
import { formatBytes } from "./utils";

function ImageSelected(props) {

    const dispatch = useDispatch();

    const image = useSelector(getOriginalImage);

    const handleResetImage = () => {
        dispatch(resetImage());
        props.gotoNextStep(1);
    };

    return (
        <div className="container--one-line">
            <div className="add-post__header">
                <button className="reset-button" disabled={!image} onClick={handleResetImage}><UndoIcon />Відмінити</button>
                <button className="button-next button-yellow" disabled={!image} onClick={() => props.gotoNextStep(3)}>Далі</button>
            </div>
            <div className="image-selected">
                <div className="image-selected__shield"></div>
                <img src={URL.createObjectURL(image)} alt="" />
                <div className="image-selected__title">
                    {image.name}
                </div>
                <div className="image-selected__size">
                    {formatBytes(image.size)}
                </div>
            </div>
        </div>
    );
}

ImageSelected.propTypes = {
    gotoNextStep: PropTypes.func
};

export default ImageSelected;
