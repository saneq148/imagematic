import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        localStorage.getItem('token') ? (
            <header>
                <div className="container">
                    <nav>

                    </nav>
                    <div onClick={() => {
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}>
                        Вийти</div>
                </div>
            </header>
        ) : <></>
    );
}

export default Header;
