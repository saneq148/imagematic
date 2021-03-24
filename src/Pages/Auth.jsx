import React from "react";
import "./Auth.scss";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

function Auth({ children }) {
    /*if (localStorage.getItem('token')) {
        return <Redirect to={{ pathname: "/" }} />;
    }*/
    return (
        <div className="container">
            <div className="auth">{children}</div>
        </div>
    );
}

Auth.propTypes = {
    children: PropTypes.object,
};

export default Auth;
