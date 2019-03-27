import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Navbar.css';

export default class Navbar extends Component {
    render() {
        return (
            <header>
                <div class="container">
                    <h1 class="logo">ShipIt</h1>
                    <nav>
                        <ul>
                            <Router>
                                <li><a><Link to="/">Home</Link></a></li>
                                <li><a><Link to="/about">About</Link></a></li>
                                <li><a><Link to="/tracking">Tracking</Link></a></li>
                                <li><a><Link to="/location">Locations</Link></a></li>
                                <li><a><Link to="/login">Login</Link></a></li>
                            </Router>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

