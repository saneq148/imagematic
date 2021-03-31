import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import { ReactComponent as Logo } from "src/logo.svg";
import Account from "./Account";

function Header() {
    return (
        <div className="header-wrapper">
            <div className="container">
                <header className="header">
                    <div className="header__logo">
                        <NavLink to="/" exact activeClassName="root">
                            <Logo />
                            <span>Imagematic</span>
                        </NavLink>
                    </div>
                    <nav className="header__links">
                        <ul>
                            <li><NavLink to="/" exact activeClassName="active">Головна</NavLink></li>
                            <li><NavLink to="/categories" exact activeClassName="active">Категорії</NavLink></li>
                        </ul>
                    </nav>
                    <div className="header__user">
                        <Account />
                    </div>
                </header>
            </div>
        </div>
    );
}

export default Header;
