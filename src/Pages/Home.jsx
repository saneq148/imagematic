import React from "react";

function Home() {
    return (
        <div className="container">
            <h1>Hello, {JSON.parse(localStorage.getItem("user")).username}</h1>
        </div>
    );
}

export default Home;
