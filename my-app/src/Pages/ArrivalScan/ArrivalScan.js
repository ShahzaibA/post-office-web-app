import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from 'react-bootstrap';

const styles = theme => ({
    root: {
        width: '90%',
        maxHeight: 500,
        marginTop: 100,
        margin: 'auto',
        overflowX: 'auto',
        overflowY: 'auto'
    },
    table: {
        minWidth: 700,
    },
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: '#00bfa5',
        color: 'black'
    }
});

class ArrivalScan extends Component {

    state = {
        packages: [
            { package_ID: 1, receivers_addr: '1120 Haye Rd', receivers_city: 'Houston', receivers_state: 'TX', receivers_zip: '77546' },
            { package_ID: 4, receivers_addr: '3242 Memory Ln', receivers_city: 'Friendswood', receivers_state: 'TX', receivers_zip: '77232' },
            { package_ID: 5, receivers_addr: 'McLovin St.', receivers_city: 'Boulder', receivers_state: 'CO', receivers_zip: '27203' }]

    }

    renderPackageList = ({ package_ID, receivers_addr, receivers_city, receivers_state, receivers_zip }) =>
        <TableRow key={package_ID}>
            <TableCell component="th" scope="row">
                {package_ID}
            </TableCell>
            <TableCell align="right">{receivers_addr}</TableCell>
            <TableCell align="right">{receivers_city}</TableCell>
            <TableCell align="right">{receivers_state}</TableCell>
            <TableCell align="right">{receivers_zip}</TableCell>
            <TableCell align="right"><Button size='sm' variant="outline-danger" onClick={() => this.delUser(package_ID)} >Scan Arrival</Button></TableCell>
        </TableRow>

    render() {
        const { classes } = this.props;
        const { packages } = this.state;
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.header}>Package #</TableCell>
                                <TableCell align="right" className={classes.header}>Shipping Address</TableCell>
                                <TableCell align="right" className={classes.header}>Shipping City</TableCell>
                                <TableCell align="right" className={classes.header}>Shipping State</TableCell>
                                <TableCell align="right" className={classes.header}>Shipping Zip</TableCell>
                                <TableCell align="right" className={classes.header}>Scan Arrival</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {packages.map(this.renderPackageList)}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }
}

ArrivalScan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArrivalScan);