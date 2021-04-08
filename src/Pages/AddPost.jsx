import React, { useState } from "react";
import { Header } from "../Components";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "src/config";
import "src/Components/Content.scss";
import { ImageSelect, ImageSelected, AddPostForm } from "src/Components";
import { useSelector, useDispatch } from "react-redux";
import { getImage, getFormErrors } from "src/state/addPost/selectors";
import { publishPost, resetImage } from "src/state/addPost/actions";
import "src/Components/ImageSelected.scss";
import "./AddPost.scss";
import "semantic-ui-css/components/icon.min.css";
import "semantic-ui-css/components/button.min.css";
import UndoIcon from "@material-ui/icons/Undo";

function AddPost() {

    const dispatch = useDispatch();
    const image = useSelector(getImage);

    const [submittingStep, setSubmittingStep] = useState(1);
    const [uploadingProgress, setUploadingProgress] = useState(null);

    const handlePublish = () => {
        dispatch(publishPost(setUploadingProgress));
    };

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
                <div className="add-post__loading"><div style={{ width: `${((submittingStep - 1) / 3) * 100 + (uploadingProgress / 3)}%` }}></div></div>
                <div className="container">
                    <section className="add-post">
                        <header className="content-header">
                            <div className="content-header__title">
                                <h1>Створити пост</h1>
                            </div>
                        </header>
                        <div className="content">
                            <div className="add-post__header">
                                {image && submittingStep !== 1 && submittingStep !== 2 && <button className="reset-button" disabled={!image} onClick={() => setSubmittingStep(submittingStep - 1)}>Назад</button>}
                                {image && submittingStep === 2 && <button className="reset-button" onClick={handleResetImage}><UndoIcon />Відмінити</button>}
                                {image && submittingStep !== 3 && submittingStep !== 1 && <button className="button-next button-yellow" disabled={!image} onClick={() => setSubmittingStep(submittingStep + 1)}>Далі</button>}
                                {image && submittingStep === 3
                                    && <button
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
                                    </button>}
                            </div>

                            {submittingStep === 1 && <div className="content-center">
                                <ImageSelect gotoNextStep={setSubmittingStep} />
                            </div>}
                            {image && submittingStep === 2 && <ImageSelected />}
                            {image && submittingStep === 3 && <AddPostForm />}
                        </div>
                    </section>
                </div>
            </main>
        </>);
}

export default AddPost;