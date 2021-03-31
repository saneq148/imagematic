import React from "react";
import "./Preloader.scss";
import { Puff } from "svg-loaders-react";

function Preloader() {
    return (
        <div className="preloader">
            <Puff fill="#000000" color="#000" stroke="#000" size="50" />
        </div>
    );
}

export default Preloader;
