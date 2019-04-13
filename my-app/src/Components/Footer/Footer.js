import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './Footer.css';
import { Divider } from '@material-ui/core';
const styles = {
    foot: {
        position: 'fixed',
        bottom: 0,
        padding: 50,
        fontWeight: 100,
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
                <div>
                    <Divider></Divider>
                    <div style={{ textAlign: 'left', padding: '10px', fontSize: '0.8em' }} >ShipIt Inc. (Group 2)  |  Christopher Dang  |  Shahzaib Ali  |  Jose Boccalandro  |  Victor Zapata</div>
                </div>
            </footer>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);