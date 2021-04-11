import React, { useState, useCallback, useEffect } from "react";
import "./AddPostEditor.scss";
import Cropper from "react-easy-crop";
import PropTypes from "prop-types";
import "src/scss/Content.scss";
import CropDinIcon from "@material-ui/icons/CropDin";
import CropPortraitIcon from "@material-ui/icons/CropPortrait";
import CropLandscapeIcon from "@material-ui/icons/CropLandscape";
import DoneIcon from "@material-ui/icons/Done";
import HistoryIcon from "@material-ui/icons/History";
import { getCroppedImg } from "./utils";
import { setImage, setImageBeenEdited } from "src/state/addPost/actions";
import { getImage, getOriginalImage } from "src/state/addPost/selectors";
import { useDispatch, useSelector } from "react-redux";

function AddPostEditor(props) {

    const selectedImage = props.image;

    const type = selectedImage.type;

    const image = useSelector(getImage);

    const dispatch = useDispatch();
    
    const [editImage, setEditImage] = useState(null);

    const originalImage = useSelector(getOriginalImage);

    const undoChanges = () => {
        setRotation(0);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setAspectRatio(1 / 1);
        dispatch(setImage(originalImage));
        readImageFromState(originalImage);
        dispatch(setImageBeenEdited(false));
    };

    const result = async () => {
        try {
            const croppedImage = await getCroppedImg(
            editImage,
            croppedAreaPixels,
            rotation
            );
            return croppedImage;
        } 
        catch (e) {
            console.error(e);
        }
    };
    const handleSave = () => {
        result().then((res) => {
            async function convertedFile() {
                let file = await fetch(res).then(r => r.blob()).then(blobFile => new File([blobFile], "edited", { type: type }));
                return file;
            }
            convertedFile().then((res) => {
                dispatch(setImage(res));
                const reader = new FileReader();
                reader.readAsDataURL(res);
                reader.addEventListener("load", () => {
                    setEditImage(reader.result);
                    setZoom(1);
                    setCrop({ x: 0, y: 0 });
                    setRotation(0);
                    dispatch(setImageBeenEdited(true));
                });
            });

        });
    };

    const readImageFromState = (image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener("load", () => {
            setEditImage(reader.result);
        });
    };

    useEffect(() => {
        readImageFromState(image);
    }, []);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(1 / 1);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);



    return (
        <div className="container--one-line">
            <div className="crop-buttons">
                <button className="undo-button" onClick={undoChanges}><HistoryIcon /></button>
                <button className={aspectRatio === 1 / 1 ? "active" : ""} onClick={() => setAspectRatio(1 / 1)}><CropDinIcon /></button>
                <button className={aspectRatio === 3 / 4 ? "active" : ""} onClick={() => setAspectRatio(3 / 4)}><CropPortraitIcon /></button>
                <button className={aspectRatio === 4 / 3 ? "active" : ""} onClick={() => setAspectRatio(4 / 3)}><CropLandscapeIcon /></button>
                <button onClick={handleSave} className="save-button"><DoneIcon /></button>
            </div>
            <div className="cropper">
                <Cropper
                    image={editImage}
                    crop={crop}
                    aspect={aspectRatio}
                    zoom={zoom}
                    rotation={rotation}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
        </div>
    );
}

AddPostEditor.propTypes = {
    image: PropTypes.object
};


export default AddPostEditor;
