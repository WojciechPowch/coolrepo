import React from 'react';
import './Navbar.scss';
import { Nav } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav>
            <ul>
                <li>
                    <Nav to="/">Home</Nav>
                </li>
                <li>
                    <Nav to="/information">O nas</Nav>
                </li>
                <li>
                    <Nav to="/news">Wiadomości</Nav>
                </li>
                <li>
                    <Nav to="/contact">Kontakt</Nav>
                </li>
            </ul>
        </nav>
    )

};

export default Navbar;