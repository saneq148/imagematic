import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { AddPhotoAlternate, SaveAlt, PhotoLibrary } from "@material-ui/icons";
import "./ImageSelect.scss";
import { setImage } from "src/state/addPost/actions";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ImageSelect(props) {


    console.log(props);
    const dispatch = useDispatch();

    const input_file = useRef(null);

    const [dragAndDropStarted, setDragAndDropStarted] = useState(false);
    const [dragAndDropOnInput, setDragAndDropOnInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleErrorClose = () => {
        setErrorMessage(false);
    };

    const checkFileIsImage = (file) => {
        if (!file || !file.name) {
            return;
        }
        let idxDot = file.name.lastIndexOf(".") + 1;
        let extFile = file.name.substr(idxDot, file.name.length).toLowerCase();
        if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
            dispatch(setImage(file));
            props.gotoNextStep(2);
            return;
        }
        else {
            setErrorMessage(`Хибний тип файлу: ${file.name}`);
        }
    };

    // INPUT DRAG & DROP EVENTS
    const handleDragEnter = () => {
        setDragAndDropOnInput(true);
    };
    const handleDragLeave = () => {
        setDragAndDropOnInput(false);
    };
    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        checkFileIsImage(e.dataTransfer.files[0]);
        setDragAndDropStarted(false);
        setDragAndDropOnInput(false);
    };

    // WINDOW DRAG & DROP EVENTS
    const handleWindowDragAndDropEnter = (e) => {
        setDragAndDropStarted(true);
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "none";
    };
    const handleWindowDragAndDropLeave = (e) => {
        if (!e.fromElement) {
            setDragAndDropStarted(false);
        }
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "none";
    };
    const handleWindowDragAndDropOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "none";
    };
    const handleWindowDragAndDropDrop = (e) => {
        e.preventDefault();
        setDragAndDropStarted(false);
    };

    useEffect(() => {
        window.addEventListener("dragenter", handleWindowDragAndDropEnter);
        window.addEventListener("dragleave", handleWindowDragAndDropLeave);
        window.addEventListener("dragover", handleWindowDragAndDropOver);
        window.addEventListener("drop", handleWindowDragAndDropDrop);
        return () => {
            window.removeEventListener("dragenter", handleWindowDragAndDropEnter);
            window.removeEventListener("dragleave", handleWindowDragAndDropLeave);
            window.removeEventListener("dragover", handleWindowDragAndDropOver);
            window.removeEventListener("drop", handleWindowDragAndDropDrop);
        };
    }, []);

    return (
        <div className={
            classNames("upload-box",
                { "upload-box--open": dragAndDropStarted },
                { "upload-box--active": dragAndDropOnInput },
                { "upload-box--disabled": false/*isFilePicked*/ }
            )}>
            <Snackbar open={errorMessage} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={3000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error">
                    <div className="alert-text">{errorMessage}</div>
                </Alert>
            </Snackbar>
            <form
                onDrop={e => handleDrop(e)}
                onDragOver={e => handleDragOver(e)}
                onDragEnter={e => handleDragEnter(e)}
                onDragLeave={e => handleDragLeave(e)}
            >
                <div className="upload-box__input">
                    <input className="box__file" ref={input_file} type="file" name="file" onChange={(e) => { checkFileIsImage(e.target.files[0]); }} accept=".png, .jpg, .jpeg" id="file" hidden />
                    {!dragAndDropStarted &&
                        <label htmlFor="file">
                            <div className="input-label">
                                <div className="input-label__icon">
                                    <AddPhotoAlternate />
                                </div>
                                <div className="input-label__text">
                                    <u>Виберіть зображення</u> <span className="only-on-pc">або перетягніть його сюди</span>
                                </div>
                            </div>
                        </label>
                    }
                </div>
                <div className="upload-box__drop">
                    <div className="input-label">
                        <div className="input-label__icon">
                            <PhotoLibrary />
                        </div>
                        <div className="input-label__text">
                            Перетягніть зображення сюди
                        </div>
                    </div>
                </div>
                <div className="upload-box__drop-here">
                    <div className="input-label">
                        <div className="input-label__icon">
                            <SaveAlt />
                        </div>
                        <div className="input-label__text">
                            Відпустіть файл тут
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

ImageSelect.propTypes = {
    gotoNextStep: PropTypes.func
};

export default ImageSelect;
