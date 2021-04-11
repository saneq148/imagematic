import React, { useState, useEffect } from "react";
import { Header } from "src/Components/Header";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "src/config";
import "src/scss/Content.scss";
import { ImageSelect, ImageSelected, AddPostForm, AddPostEditor } from "src/Components/AddPost";
import { useSelector, useDispatch } from "react-redux";
import { getImage, getFormErrors, getImageIsEdited } from "src/state/addPost/selectors";
import { publishPost, resetImage, resetForm } from "src/state/addPost/actions";
import "./AddPost.scss";
import "semantic-ui-css/components/icon.min.css";
import "semantic-ui-css/components/button.min.css";
import UndoIcon from "@material-ui/icons/Undo";

function AddPost() {

    const dispatch = useDispatch();
    const image = useSelector(getImage);
    const imageEdited = useSelector(getImageIsEdited);

    const [submittingStep, setSubmittingStep] = useState(1);
    const [uploadingProgress, setUploadingProgress] = useState(null);

    const handlePublish = () => {
        dispatch(publishPost(setUploadingProgress));
    };

    useEffect(() => {
        return () => {
            dispatch(resetForm());
        };
    }, []);

    const isReadyToPublish = useSelector(getFormErrors);

    const handleResetImage = () => {
        dispatch(resetImage());
        setSubmittingStep(1);
    };

    return (
        <>
            <Helmet>
                <title>{SITE_NAME} - Створити пост</title>
            </Helmet>
            <Header />
            <main className="main-content">
                <div className="add-post__loading"><div style={{ width: `${((submittingStep - 1) / 4) * 100 + (uploadingProgress / 4)}%` }}></div></div>
                <div className="container">
                    <section className="add-post">
                        <header className="content-header">
                            <div className="content-header__title">
                                <h1>Створити пост</h1>
                            </div>
                        </header>
                        <div className="content">
                            {image && submittingStep === 2 && (
                                <div className="add-post__header">
                                    <button className="reset-button" disabled={!image} onClick={handleResetImage}><UndoIcon />Відмінити</button>
                                    <button className="button-next button-yellow" disabled={!image} onClick={() => setSubmittingStep(3)}>Далі</button>
                                </div>
                            )}
                            {image && submittingStep === 3 && (
                                <div className="add-post__header">
                                    <button className="reset-button" disabled={!image} onClick={() => setSubmittingStep(2)}>Назад</button>
                                    <button className="button-next button-yellow" disabled={!imageEdited} onClick={() => setSubmittingStep(4)}>Далі</button>
                                </div>
                            )}
                            {image && submittingStep === 4 && (
                                <div className="add-post__header">
                                    <button className="reset-button" disabled={!image} onClick={() => setSubmittingStep(3)}>Назад</button>
                                    <button
                                        className="button-next button-yellow"
                                        disabled={isReadyToPublish !== false || uploadingProgress}
                                        onClick={handlePublish}>
                                        Опублікувати
                                        {uploadingProgress &&
                                            <div className="button-progress">
                                                <div className="button-progress__text">
                                                    Публікація...
                                        </div>
                                                <div
                                                    className="button-progress__loading"
                                                    style={{ width: `${uploadingProgress}%` }}>
                                                </div>
                                            </div>}
                                    </button>
                                </div>
                                )}

                            {submittingStep === 1 && <div className="content-center">
                                <ImageSelect gotoNextStep={setSubmittingStep} />
                            </div>}
                            {image && submittingStep === 2 && <ImageSelected />}
                            {image && submittingStep === 3 && <AddPostEditor image={image} />}
                            {image && submittingStep === 4 && <AddPostForm />}
                        </div>
                    </section>
                </div>
            </main>
        </>);
}

export default AddPost;