import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';

class Navbar extends Component {
    render() {
        return (
            <header>
                <div class="container">
                    <img class='logo' src={logo} alt="ShipIt" />
                    <nav>
                        <ul>
                            <li><a><Link to="/">Home</Link></a></li>
                            <li><a><Link to="/tracking">Tracking</Link></a></li>
                            <li><a><Link to="/send_package">Send Package</Link></a></li>
                            <li><a><Link to="/user_profile">Profile</Link></a></li>
                            <li><a><Link to="/login">Login</Link></a></li>
                        </ul>
                    </nav>
                </div>
            </header >
        );
    }
}
export default Navbar;
