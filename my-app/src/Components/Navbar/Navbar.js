import React, { Component } from 'react';
import './Navbar.css';

export default class Navbar extends Component {
    render() {
        return (
            <header>
                <div class="container">
                    <h1 class="logo">ShipIt</h1>
                    <nav>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Locations</a></li>
                            <li><a href="#">Login</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

