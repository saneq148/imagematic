import React, { useState } from "react";
import { Header } from "../Components";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "src/config";
import "src/Components/Content.scss";
import { ImageSelect, ImageSelected, AddPostForm } from "src/Components";
import { useSelector, useDispatch } from "react-redux";
import { getImage, getFormErrors } from "src/state/addPost/selectors";
import { publishPost } from "src/state/addPost/actions";
import "src/Components/ImageSelected.scss";
import "./AddPost.scss";
import "semantic-ui-css/components/icon.min.css";

function AddPost() {

    const dispatch = useDispatch();
    const image = useSelector(getImage);

    const [submittingStep, setSubmittingStep] = useState(1);

    const handlePublish = () => {
        dispatch(publishPost());
    };

    const isReadyToPublish = useSelector(getFormErrors);

    return (
        <>
            <Helmet>
                <title>{SITE_NAME} - Створити пост</title>
            </Helmet>
            <Header />
            <main className="main-content">
                <div className="container">
                    <section className="add-post">
                        <header className="content-header">
                            <div className="content-header__title">
                                <h1>Створити пост</h1>
                            </div>
                        </header>
                        <div className="content">
                            <div className="add-post__header">
                                {image && submittingStep !== 1 && <button className="button-next button-yellow" disabled={!image} onClick={() => setSubmittingStep(submittingStep - 1)}>Назад</button>}
                                {image && submittingStep !== 3 && submittingStep !== 1 && <button className="button-next button-yellow" disabled={!image} onClick={() => setSubmittingStep(submittingStep + 1)}>Далі</button>}
                                {image && submittingStep === 3 && <button className="button-next button-yellow" disabled={isReadyToPublish !== false} onClick={handlePublish}>Опублікувати</button>}
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