import React from "react";
import "./Auth.scss";
import PropTypes from "prop-types";

function Auth({ children }) {
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
