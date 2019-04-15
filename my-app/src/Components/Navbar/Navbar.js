import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
        this.setState({ user_ID: null })
        localStorage.removeItem('employee_email');
        this.setState({ employee_email: null })
        localStorage.removeItem('job_title');
        this.setState({ job_title: null });
        localStorage.removeItem('Tracking_ID');
        window.location.replace('/');
    }

    render() {
        const { anchorEl } = this.state;
        return (
            <header style={{ maxWidth: '100%' }}>
                {this.state.width < 1200 ? (
                    <div class="container" style={{ alignContent: 'center', margin: '0 auto', maxWidth: '100%' }}>
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

                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <a href="/"><Link to="/"><MenuItem onClick={this.handleClose}>Home</MenuItem></Link></a>
                                {localStorage.getItem('sender_ID') === null && localStorage.getItem('employee_email') === null ? (
                                    <Fragment>
                                        <li><a href="/send_package" class="MenuContents"><Link to="/send_package">Send Package</Link></a></li>
                                        <li class='LoginNav' ><a href="/login"><Link to="/login" class='LoginNav'>Login</Link></a></li>
                                    </Fragment>
                                ) : ([<Fragment></Fragment>
                                ])}
                                {localStorage.getItem('sender_ID') !== null && localStorage.getItem('employee_email') === null ? (
                                    <Fragment>
                                        <li><a href="/send_package" class="MenuContents"><Link to="/send_package">Send Package</Link></a></li>
                                        <li><a href="/invoice" class="MenuContents"><Link to="/invoice">Invoice</Link></a></li>
                                        <li><a href="/user_profile" class="MenuContents"><Link to="/user_profile">Profile</Link></a></li>
                                        <li class='LoginNav' ><a href="/"><Link to="/" onClick={this.processLogout} class='LoginNav'>Logout</Link></a></li>
                                    </Fragment>
                                ) : (<Fragment></Fragment>)}
                                {localStorage.getItem('sender_ID') === null && localStorage.getItem('employee_email') !== null && localStorage.getItem('job_title') === 'Manager' ? (
                                    <Fragment>
                                        <EmployeeNavBar employee_email={(this.state.employee_email)} />
                                        <li class='LoginNav' ><a href="/"><Link to="/" onClick={this.processLogout} class='LoginNav'>Logout</Link></a></li>
                                    </Fragment>
                                ) : (<Fragment></Fragment>)}
                                {localStorage.getItem('sender_ID') === null && localStorage.getItem('employee_email') !== null && localStorage.getItem('job_title') === 'Driver' ? (
                                    <Fragment>
                                        <li><a href="/deliveries"><Link to="/deliveries">Deliveries</Link></a></li>
                                        <li class='LoginNav' ><a href="/"><Link to="/" onClick={this.processLogout} class='LoginNav'>Logout</Link></a></li>
                                    </Fragment>
                                ) : (<Fragment></Fragment>)}

                            </Menu>
                        </div>
                    </div>) :

                    (<div class="container" style={{ alignContent: 'center', margin: '0 auto', maxWidth: '100%', }}>
                        <a href="/"><Link to="/"><img class='logo' src={logo} alt="ShipIt" /></Link></a>
                        <nav>
                            <ul>
                                <li><a href="/"><Link to="/">Home</Link></a></li>
                                {localStorage.getItem('sender_ID') === null && localStorage.getItem('employee_email') === null ? (
                                    <Fragment>
                                        <li><a href="/send_package"><Link to="/send_package">Send Package</Link></a></li>
                                        <li class='LoginNav' ><a href="/login"><Link to="/login" class='LoginNav'>Login</Link></a></li>
                                    </Fragment>
                                ) : ([<Fragment></Fragment>
                                ])}
                                {localStorage.getItem('sender_ID') != null && localStorage.getItem('employee_email') == null ? (
                                    [
                                        <li><a href="/send_package"><Link to="/send_package">Send Package</Link></a></li>,
                                        <li><a href="/invoice"><Link to="/invoice">Invoice</Link></a></li>,
                                        <li><a href="/user_profile"><Link to="/user_profile">Profile</Link></a></li>,
                                        <li><a href="/"><Link to="/" onClick={this.processLogout} class='LoginNav'>Logout</Link></a></li>,
                                    ]
                                ) : (<Fragment></Fragment>)}
                                {localStorage.getItem('sender_ID') === null && localStorage.getItem('employee_email') !== null && localStorage.getItem('job_title') === 'Manager' ? (
                                    <Fragment>
                                        <EmployeeNavBar employee_email={(this.state.employee_email)} />
                                        <li class='LoginNav' ><a href="/"><Link to="/" onClick={this.processLogout} class='LoginNav'>Logout</Link></a></li>
                                    </Fragment>
                                ) : (<Fragment></Fragment>)}
                                {localStorage.getItem('sender_ID') === null && localStorage.getItem('employee_email') !== null && localStorage.getItem('job_title') === 'Driver' ? (
                                    <Fragment>
                                        <li><a href="/deliveries"><Link to="/deliveries">Deliveries</Link></a></li>
                                        <li class='LoginNav' ><a href="/"><Link to="/" onClick={this.processLogout} class='LoginNav'>Logout</Link></a></li>
                                    </Fragment>
                                ) : (<Fragment></Fragment>)}
                            </ul>
                        </nav>
                    </div>)
                }
            </header >
        );
    }
}
export default Navbar;
