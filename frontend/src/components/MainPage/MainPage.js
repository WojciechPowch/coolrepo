import React, { Component } from 'react';
import Navbar from './../Navbar/Navbar.js';
import { Route } from 'react-router-dom';
import Home from './../Home/Home';
import Information from './../Information/Information';
import News from './../News/News';
import Contact from './../Contact/Contact';
import './MainPage.scss';
import Footer from '../Footer/Footer.js';

class MainPage extends Component {
    state = {}
    render() {
        return (
            <section className="MainPage-section">

                <div className="grid__container">
                    <Navbar />
                    <Route exact path="/" component={Home} />
                    <Route path="/information" component={Information} />
                    <Route path="/news" component={News} />
                    <Route path="/contact" component={Contact} />
                    <Footer />
                </div>
            </section>
        );
    }
}

export default MainPage;