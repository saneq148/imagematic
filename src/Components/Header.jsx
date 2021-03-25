import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { ReactComponent as Logo } from "../Logo.svg";
import Account from "./Account";

function Header() {
    return (
        <div className="header-wrapper">
            <div className="container">
                <header className="header">
                    <div className="header__logo">
                        <Link to="/">
                            <Logo />
                            <span>Imagematic</span>
                        </Link>
                    </div>
                    <nav></nav>
                    <div className="header__user">
                        <Account />
                    </div>
                    {/*<div
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.reload();
                        }}
                    >
                        Вийти
                    </div>*/}
                </header>
            </div>
        </div>
    );
}

export default Header;
