import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';
import Button from '@material-ui/core/Button';
import EmployeeNavBarMenu from './EmployeeNavBarMenu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
        job_title: localStorage.getItem('job_title'),
        width: 0,
        height: 0,
        anchorEl: null,
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget })
    }
    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() { this.updateWindowDimensions(); window.addEventListener('resize', this.updateWindowDimensions); }
    componentWillUnmount() { //window.removeEventListener('resize', this.updateWindowDimensions); 
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    processLogout = () => {
        localStorage.removeItem('sender_ID');
        this.setState({user_ID: null})
        localStorage.removeItem('employee_email');
        this.setState({employee_email: null})
        localStorage.removeItem('job_title');
        this.setState({job_title: null})
    }

    render() {
        const { anchorEl } = this.state;
        return (
            <header>
                {this.state.width < 1200 ? (
                    <div class="container" style={{ alignContent: 'center', margin: '0 auto' }}>
                        <a href="/"><Link to="/"><img class='logo' src={logo} alt="ShipIt" /></Link></a>
                        <div class='ShipItMenu'>
                            <Button
                                aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                style={{
                                    paddingTop: '23px',
                                    fontSize: '22px !important'
                                }}
                            >
                                ShipIt Menu
                            </Button>
                        </div>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <a href="/"><Link to="/"><MenuItem onClick={this.handleClose}>Home</MenuItem></Link></a>
                            <a href="/send_package"><Link to="/send_package"><MenuItem onClick={this.handleClose}>Send Package</MenuItem></Link></a>

                            {localStorage.getItem('sender_ID') === null && localStorage.getItem('employee_email') === null ? (
                                <a href="/login"><Link to="/login"><MenuItem onClick={this.handleClose} class='LoginNav'>Login</MenuItem></Link></a>
                            ) : ([
                                <a href="/invoice"><Link to="/invoice"><MenuItem onClick={this.handleClose}>Invoice</MenuItem></Link></a>,
                                <a href="/user_profile"><Link to="/user_profile"><MenuItem onClick={this.handleClose}>Profile</MenuItem></Link></a>,
                                <a href="/"><Link to="/" onClick={this.processLogout}><MenuItem onClick={this.handleClose} class='LoginNav'>Logout</MenuItem></Link></a>,
                            ])}
                            {localStorage.getItem('employee_email') !== null ? (
                                <EmployeeNavBar employee_email={(this.state.employee_email)} />
                            ) : (
                                    <div></div>
                                )}
                        </Menu>
                    </div>) :

                    (<div class="container">
                        <a href="/"><Link to="/"><img class='logo' src={logo} alt="ShipIt" /></Link></a>
                        <nav>
                            <ul>
                                <li><a href="/"><Link to="/">Home</Link></a></li>
                                <li><a href="/send_package"><Link to="/send_package">Send Package</Link></a></li>

                                {localStorage.getItem('sender_ID') === null && localStorage.getItem('employee_email') === null ? (
                                    <li class='LoginNav' ><a href="/login"><Link to="/login" class='LoginNav'>Login</Link></a></li>
                                ) : ([
                                    <li><a href="/invoice"><Link to="/invoice">Invoice</Link></a></li>,
                                    <li><a href="/user_profile"><Link to="/user_profile">Profile</Link></a></li>,
                                    <li><a href="/"><Link to="/" onClick={this.processLogout} class='LoginNav'>Logout</Link></a></li>,
                                ])}
                                {localStorage.getItem('employee_email') !== null ? (
                                    <EmployeeNavBar employee_email={(this.state.employee_email)} />
                                ) : (
                                        <div></div>
                                    )}


                            </ul>
                        </nav>
                    </div>)
                }
            </header >
        );
    }
}
export default Navbar;
