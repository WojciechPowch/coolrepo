import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className="navbar">
            <ul className="navbar__ul">
                <li className="navbar__li">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__li">
                    <Link className="navbar__link" to="/information">O nas</Link>
                </li>
                <li className="navbar__li">
                    <Link className="navbar__link" to="/news">Wiadomości</Link>
                </li>
                <li className="navbar__li">
                    <Link className="navbar__link" to="/contact">Kontakt</Link>
                </li>
            </ul>
        </nav>
    )

};

export default Navbar;