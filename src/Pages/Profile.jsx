import React, { useEffect, useState } from "react";
import { Header } from "../Components";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUserId } from "../state/user/selectors";

function Profile() {

    const [info, setInfo] = useState();

    const userId = useSelector(getUserId);

    useEffect(() => {
        axios.get("http://127.0.0.1:3333/api/users/" + userId, {
            params: {
                token: localStorage.getItem("token"),
            }
        })
            .then(response => {
                console.log(response);
                setInfo(JSON.stringify(response.data.model));
            });
    }, []);

    return (
        <>
            <Header />
            <main className="main-content">
                <div className="container">
                    <section className="categories-page">
                        <header className="page-title">
                            <h1>Профіль</h1>
                        </header>
                        <div className="content">
                            {info}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Profile;
