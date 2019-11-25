import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <section className="navbar">
            <Link className="navbar__link" to="/">Home</Link>
            <Link className="navbar__link" to="/information">O nas</Link>
            <Link className="navbar__link" to="/news">Wiadomości</Link>
            <Link className="navbar__link" to="/contact">Kontakt</Link>
        </section>
    )

};

export default Navbar;