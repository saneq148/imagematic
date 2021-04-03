import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Account.scss";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "../state/user/actions";
import { getUserId, getUserLogin, getUserName, getUserSurname } from "../state/user/selectors";
import axios from "axios";
import { Skeleton } from "@material-ui/lab";
import { host } from "src/config";

function Account() {

    const dispatch = useDispatch();

    const [visibleMenu, setVisibleMenu] = useState(false);

    const accountRef = React.useRef();

    function handleCloseUserMenu(event) {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(accountRef.current)) {
            setVisibleMenu(false);
        }
    }

    function logOut() {
        dispatch(handleLogout());
    }

    const userId = useSelector(getUserId);
    const userLogin = useSelector(getUserLogin);
    const userName = useSelector(getUserName);
    const userSurname = useSelector(getUserSurname);

    useEffect(() => {
        if (!userLogin) {
            axios.get(`${host}/api/users/${userId}`, {
                params: {
                    token: localStorage.getItem("token"),
                }
            })
                .then(response => {
                    //dispatch(setUserLogin(response.data.model.username));
                    //dispatch(setUserName(response.data.model.first_name));
                    //dispatch(setUserSurname(response.data.model.last_name));
                });
        }
        window.addEventListener("click", handleCloseUserMenu);
        return () => {
            window.removeEventListener("click", handleCloseUserMenu);
        };
    }, []);





    return (
        <div className={classnames(
            "account",
            { "account--open": visibleMenu }
        )} ref={accountRef}>
            <div className="account__button" onClick={() => setVisibleMenu(!visibleMenu)}>
                <span className="account__name">
                    {userLogin ? userLogin : <Skeleton width={100} />}
                </span>
                <div className="account__icon">
                    <AccountCircleIcon />
                </div>
            </div>
            <div className="account__menu">
                <div className="signed-as">Ви увійшли як <br />{userName} {userSurname}</div>
                <ul>
                    <li>
                        <Link to="/profile">
                            <PermIdentityIcon /><span>Профіль</span>
                        </Link>
                    </li>
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
