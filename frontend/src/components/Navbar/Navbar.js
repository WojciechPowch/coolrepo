import React, { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [link, setLink] = useState({
        home: "navbar__link",
        info: "navbar__link",
        news: "navbar__link",
        contact: "navbar__link"
    });


    const navClickHandler = (e) => {
        const navPosition = e.target.attributes[1].nodeValue;
        const tempObj = {
            home: "navbar__link",
            info: "navbar__link",
            news: "navbar__link",
            contact: "navbar__link"
        }
        tempObj[navPosition] = `navbar__link--${navPosition}`;
        setLink(tempObj);
    }

    return (
        <section className="navbar">
            <Link onClick={navClickHandler} className={link.home} navposition={"home"} to="/">Home</Link>
            <Link onClick={navClickHandler} className={link.info} navposition={"info"} to="/information">O nas</Link>
            <Link onClick={navClickHandler} className={link.news} navposition={"news"} to="/news">Wiadomości</Link>
            <Link onClick={navClickHandler} className={link.contact} navposition={"contact"} to="/contact">Kontakt</Link>
        </section>
    )

};

export default Navbar;