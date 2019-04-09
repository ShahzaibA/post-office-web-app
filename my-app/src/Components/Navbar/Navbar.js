import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';
import Button from '@material-ui/core/Button';
import EmployeeNavBarMenu from './EmployeeNavBarMenu'

function EmployeeNavBar(props) {
    //if (props.employee_email !== null) {

    if (true) {
        // return <li><a href="/employee"><Link to="/employee">Employee</Link></a></li>;
        return <li><EmployeeNavBarMenu /></li>
    }
    else
        return null;
}

class Navbar extends Component {
    state = {
        user_ID: localStorage.getItem('sender_ID'),
        employee_email: localStorage.getItem('employee_email'),
    }

    processLogout = () => {
        localStorage.removeItem('sender_ID');
        this.setState({ user_ID: null });
        localStorage.removeItem('employee_email');
        this.setState({ employee_email: null });
    }



    render() {
        return (
            <header>
                <div class="container">
                    <a href="/"><Link to="/"><img class='logo' src={logo} alt="ShipIt" /></Link></a>
                    <nav>
                        <ul>
                            <li><a href="/"><Link to="/">Home</Link></a></li>
                            <li><a href="/send_package"><Link to="/send_package">Send Package</Link></a></li>

                            {this.state.user_ID === null && this.state.employee_email === null ? (
                                <li class='LoginNav' ><a href="/login"><Link to="/login">Login</Link></a></li>
                            ) : ([
                                <li><a href="/invoice"><Link to="/invoice">Invoice</Link></a></li>,
                                <li><a href="/user_profile"><Link to="/user_profile">Profile</Link></a></li>,
                                <li><a href="/"><Link to="/" onClick={this.processLogout}>Logout</Link></a></li>,
                            ])}
                            {this.state.employee_email !== null ? (
                                <EmployeeNavBar employee_email={(this.state.employee_email)} />
                            ) : (
                                    <div></div>
                                )}


                        </ul>
                    </nav>
                </div>
            </header >
        );
    }
}
export default Navbar;
