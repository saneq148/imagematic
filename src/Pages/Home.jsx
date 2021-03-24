import React from "react";

function Home() {
    return (
        <main className="main-content">
            <div className="container">

                <h1>Hello, {JSON.parse(localStorage.getItem("user")).username}</h1>
            </div>
        </main>
    );
}

export default Home;
