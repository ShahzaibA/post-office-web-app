import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './Footer.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from '../Navbar/logo.png';
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const styles = {
    foot: {
        position: 'absolute',
        fontWeight: 100,
        height: '200px',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#d3ede8',
        width: '100%',
        textAlign: 'center'
    },
};

class Footer extends Component {
    render() {
        const { classes } = this.props;
        return (
            <footer className={classes.foot}>
                <div class="container" style={{ width: '80%' }}>
                    <Grid container justify="center" style={{ textAlign: 'center', alignItems: 'center', padding: 20, }}>
                        <a href="/"><Link to="/"><img class='logo' src={logo} alt="ShipIt" /></Link></a></Grid>
                    <Divider></Divider>
                    <div style={{ textAlign: 'left', fontSize: '0.8em', padding: 20, }} >ShipIt Inc. (Group 2)  |  Christopher Dang  |  Shahzaib Ali  |  Jose Boccalandro  |  Victor Zapata</div>
                </div>
            </footer>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);