import React from "react";
import { Header } from "../Components";
import Posts from "../Components/Posts";
import { getUserLoggedIn } from "../state/user/selectors";
import { useSelector } from "react-redux";
import { Auth } from "../Pages";
import { Login } from "../Components";

function Home() {

    const isLoggedIn = useSelector(getUserLoggedIn);

    if (!isLoggedIn) {
        return (
            <Auth>{<Login />}</Auth>
        );
    }

    return (
        <>
            < Header />
            <main className="main-content">
                <div className="container">
                    <Posts />
                </div>
            </main>
        </>);
}

export default Home;
