import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Account.scss";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import classnames from "classnames";
import { Link } from "react-router-dom";

function Account() {

    const [visibleMenu, setVisibleMenu] = useState(false);

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
        window.location.reload();
    }

    useEffect(() => {
        document.body.addEventListener("click", handleCloseUserMenu);
        return () => {
            document.body.removeEventListener("click", handleCloseUserMenu);
        };
    }, []);

    return (
        <div className={classnames(
            "account",
            { "account--open": visibleMenu }
        )} ref={accountRef}>
            <div className="account__button" onClick={() => setVisibleMenu(!visibleMenu)}>
                <span className="account__name">
                    {JSON.parse(localStorage.getItem("user")).username}
                </span>
                <div className="account__icon">
                    <AccountCircleIcon />
                </div>
            </div>
            <div className="account__menu">
                <ul>
                    <li>
                        <AddIcon /> <Link to="/add" >Додати новий пост</Link>
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
