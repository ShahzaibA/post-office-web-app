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
        backgroundColor: '#F9F4F3',
        color: 'black'
    }
});

class ArrivalScan extends Component {

    state = {
        packages: []
    }

    componentDidMount() {
        this.getPackagesAwaitingArrival();
    }

    getPackagesAwaitingArrival() {
        fetch('http://localhost:4000/get_packages_awaiting_arrival'
        )
            .then(res => res.json())
            .then(result => this.setState({ packages: result.data }))
            .catch(err => console.log(err))
    }

    renderPackageList = ({ Package_ID, Shipping_Address, Shipping_City, Shipping_State_Abbr, Shipping_Zip }) =>
        <TableRow key={Package_ID}>
            <TableCell component="th" scope="row">{Package_ID}</TableCell>
            <TableCell align="right">{Shipping_Address}</TableCell>
            <TableCell align="right">{Shipping_City}</TableCell>
            <TableCell align="right">{Shipping_State_Abbr}</TableCell>
            <TableCell align="right">{Shipping_Zip}</TableCell>
            <TableCell align="right"><Button size='sm' variant="outline-danger" onClick={() => this.delUser(Package_ID)} >Scan Arrival</Button></TableCell>
        </TableRow>

    render() {
        const { classes } = this.props;
        const { packages } = this.state;
        console.log(this.state.packages)
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