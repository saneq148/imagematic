import React from "react";
import { Header } from "src/Components/Header";
import { Posts } from "src/Components/Home";
import { getUserLoggedIn } from "src/state/user/selectors";
import { useSelector } from "react-redux";
import { Auth, Login } from "src/Components/Auth";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "src/config";

function Home() {

    const isLoggedIn = useSelector(getUserLoggedIn);

    if (!isLoggedIn) {
        return (
            <Auth>
                <Login />
            </Auth>
        );
    }

    return (
        <>
            <Helmet>
                <title>{SITE_NAME} - Головна</title>
            </Helmet>
            <Header />
            <main className="main-content">
                <div className="container">
                    <Posts />
                </div>
            </main>
        </>);
}

export default Home;
