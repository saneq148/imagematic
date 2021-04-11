import React, { useState, useEffect } from "react";
import { Header } from "src/Components/Header";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "src/config";
import "src/scss/Content.scss";
import { ImageSelect, ImageSelected, AddPostForm, AddPostEditor } from "src/Components/AddPost";
import { useSelector, useDispatch } from "react-redux";
import { getImage } from "src/state/addPost/selectors";
import { resetImage } from "src/state/addPost/actions";
import "./AddPost.scss";
import "semantic-ui-css/components/icon.min.css";
import "semantic-ui-css/components/button.min.css";

function AddPost() {

    const image = useSelector(getImage);
    
    const [submittingStep, setSubmittingStep] = useState(1);

    const [uploadingProgress, setUploadingProgress] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(resetImage());
        };
    }, []);

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
                            {submittingStep === 1 && <ImageSelect gotoNextStep={setSubmittingStep} />}
                            {image && submittingStep === 2 && <ImageSelected gotoNextStep={setSubmittingStep}/>}
                            {image && submittingStep === 3 && <AddPostEditor image={image} gotoNextStep={setSubmittingStep}/>}
                            {image && submittingStep === 4 && <AddPostForm setUploadingProgress={setUploadingProgress} uploadingProgress={uploadingProgress} gotoNextStep={setSubmittingStep}/>}
                        </div>
                    </section>
                </div>
            </main>
        </>);
}

export default AddPost;