import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "src/Components/Account/Account.scss";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "src/state/user/actions";
import { getUserLogin, getUserName, getUserSurname } from "src/state/user/selectors";
import { Skeleton } from "@material-ui/lab";

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

    const userLogin = useSelector(getUserLogin);
    const userName = useSelector(getUserName);
    const userSurname = useSelector(getUserSurname);

    useEffect(() => {
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
