import React from "react";
import { NavLink } from "react-router-dom";
import "src/Components/Header/Header.scss";
import { ReactComponent as Logo } from "src/logo.svg";
import { Account } from "src/Components/Account/";

function Header() {
    return (
        <div className="header-wrapper">
            <div className="container">
                <header className="page-header">
                    <div className="page-header__logo">
                        <NavLink to="/" exact activeClassName="root">
                            <Logo />
                            <span>Imagematic</span>
                        </NavLink>
                    </div>
                    <nav className="page-header__links">
                        <ul>
                            <li><NavLink to="/" exact activeClassName="active">Головна</NavLink></li>
                            <li><NavLink to="/categories" exact activeClassName="active">Категорії</NavLink></li>
                        </ul>
                    </nav>
                    <div className="page-header__user">
                        <Account />
                    </div>
                </header>
            </div>
        </div>
    );
}

export default Header;
