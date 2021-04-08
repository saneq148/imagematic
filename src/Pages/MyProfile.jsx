import React, { useEffect, useState } from "react";
import { Header } from "../Components";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "src/config";
import "src/Components/Content.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "src/state/profile/actions";
import { getProfileInfo } from "src/state/profile/selectors";

function MyProfile() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, []);

    const profile = useSelector(getProfileInfo);
    console.log(profile);

    return (
        <>
            <Helmet>
                <title>{SITE_NAME} - Мій профіль</title>
            </Helmet>
            <Header />
            <main className="main-content">
                <div className="container">
                    <section className="my-profile-page">
                        <header className="content-header">
                            <div className="content-header__title">
                                <h1>Мій профіль</h1>
                            </div>
                        </header>
                        <div className="content">
                            <div className="user-info">
                                <div className="user-info__item">
                                    <span className="user-info__label">Username:</span>
                                    <div className="user-info__content">{profile.username}</div>
                                </div>
                                <div className="user-info__item">
                                    <span className="user-info__label">Name:</span>
                                    <div className="user-info__content">{profile.first_name}</div>
                                </div>
                                <div className="user-info__item">
                                    <span className="user-info__label">Surname:</span>
                                    <div className="user-info__content">{profile.last_name}</div>
                                </div>
                                <div className="user-info__item">
                                    <span className="user-info__label">Phone:</span>
                                    <div className="user-info__content">{profile.phone}</div>
                                </div>
                                <div className="user-info__item">
                                    <span className="user-info__label">Username:</span>
                                    <div className="user-info__content">{profile.username}</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default MyProfile;
