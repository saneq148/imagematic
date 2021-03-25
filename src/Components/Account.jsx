import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Account.scss";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/user";
import { Redirect } from "react-router-dom";

function Account() {

    const dispatch = useDispatch();

    const [visibleMenu, setVisibleMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const accountRef = React.useRef();

    function handleCloseUserMenu(event) {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(accountRef.current)) {
            setVisibleMenu(false);
        }
    }

    function logOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    }

    dispatch(setUser(isLoggedIn));

    useEffect(() => {
        window.addEventListener("click", handleCloseUserMenu);
        return () => {
            window.removeEventListener("click", handleCloseUserMenu);
        };
    }, []);

    if (!isLoggedIn) {
        return (
            <Redirect to="/login" />
        );
    }

    return (
        <div className={classnames(
            "account",
            { "account--open": visibleMenu }
        )} ref={accountRef}>
            <div className="account__button" onClick={() => setVisibleMenu(!visibleMenu)}>
                <span className="account__name">
                    Username
                </span>
                <div className="account__icon">
                    <AccountCircleIcon />
                </div>
            </div>
            <div className="account__menu">
                <ul>
                    <li>
                        <Link to="/add" ><AddIcon /><span>Додати новий пост</span></Link>
                    </li>
                    <li onClick={logOut}>
                        <ExitToAppIcon /> <span>Вийти</span>
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default Account;
