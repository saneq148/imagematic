import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "src/Components/Header/Header.scss";
import { ReactComponent as Logo } from "src/logo.svg";
import { Account } from "src/Components/Account/";
import MenuIcon from "@material-ui/icons/Menu";

function Header() {

    const [navbarOpened, setNavbarOpened] = useState(false);

    function handleCloseNavbar(event) {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(burgerRef.current)) {
            setNavbarOpened(false);
        }
    }

    useEffect(() => {
        document.body.addEventListener("click", handleCloseNavbar);
        return () => {
            document.body.removeEventListener("click", handleCloseNavbar);
        };
    }, []);

    const burgerRef = React.useRef();

    return (
        <div className={navbarOpened ? "header-wrapper header-wrapper--open" : "header-wrapper"}>
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
                            <li><NavLink to="/search" exact activeClassName="active">Пошук</NavLink></li>
                        </ul>
                    </nav>
                    <div className="page-header__user">
                        <Account />
                        <div className="page-header__burger" onClick={() => setNavbarOpened(!navbarOpened)} ref={burgerRef}>
                            <MenuIcon />
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default Header;
