import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/information">O nas</Link>
                </li>
                <li>
                    <Link to="/news">Wiadomości</Link>
                </li>
                <li>
                    <Link to="/contact">Kontakt</Link>
                </li>
            </ul>
        </nav>
    )

};

export default Navbar;