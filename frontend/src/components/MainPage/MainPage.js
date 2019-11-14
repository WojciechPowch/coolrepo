import React, { Component } from 'react';
import Navbar from './../Navbar/Navbar.js';

class MainPage extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div>Hej</div>
            </React.Fragment>
        );
    }
}

export default MainPage;