import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from 'react-bootstrap';

const styles = theme => ({
    root: {
        width: '90%',
        maxHeight: 500,
        marginTop: 0,
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
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 150,
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    },
});

class ArrivalScan extends Component {

    state = {
        packages: [],
        states: [],
        hub_location: "",
    }

    componentDidMount() {
        this.getPackagesAwaitingArrival();
        this.getStates();
    }

    handleChange = (name, val) => {
        this.setState({ [name]: val });
    };

    getStates() {
        fetch('http://localhost:4000/get_states'
        )
            .then(res => res.json())
            .then(Response => this.setState({ states: Response.states }))
            .catch(err => console.log(err))
    }

    getPackagesAwaitingArrival() {
        fetch('http://localhost:4000/get_packages_awaiting_arrival', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Hub_Location: this.state.hub_location,
            })
        })
            .then(res => res.json())
            .then(result => this.setState({ packages: result.data }))
            .catch(err => console.log(err))
    }

    arrivalScan(Package_ID, Hub_ID) {
        fetch('http://localhost:4000/arrival_scan', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Package_ID: Package_ID,
                Hub_ID: Hub_ID,
            })
        })
            .then(() => this.getPackagesAwaitingArrival())
            .catch(err => console.log(err))
    }

    renderPackageList = ({ Package_ID, Shipping_Address, Shipping_City, Shipping_State_Abbr, Shipping_Zip, Hub_ID }) =>
        <TableRow key={Package_ID}>
            <TableCell component="th" scope="row">{Package_ID}</TableCell>
            <TableCell align="right">{Shipping_Address}</TableCell>
            <TableCell align="right">{Shipping_City}</TableCell>
            <TableCell align="right">{Shipping_State_Abbr}</TableCell>
            <TableCell align="right">{Shipping_Zip}</TableCell>
            <TableCell align="right">
                <Button size='sm' variant="outline-danger" onClick={() => this.arrivalScan(Package_ID, Hub_ID)} >Scan Arrival</Button>
            </TableCell>
        </TableRow>

    render() {
        const { classes } = this.props;
        const { packages } = this.state;
        console.log(this.state.hub_location)
        return (
            <React.Fragment>
                <div class="container" style={{ padding: 50 }}>
                    <Paper className={classes.root} style={{ padding: 50 }}>
                        <h1>Arrival Scan</h1>
                        <div class="container" style={{ paddingBottom: 20 }}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="hub_location">Hub Location</InputLabel>
                                <Select
                                    inputProps={{
                                        name: 'hub_location',
                                        id: 'hub_location',
                                    }}
                                    value={this.state.hub_location}
                                    onChange={e => this.handleChange(e.target.name, e.target.value)}
                                >
                                    {this.state.states.map(option => (
                                        <MenuItem key={option.State_Abbr} value={option.State_Abbr}>
                                            {option.State_Abbr}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button onClick={() => this.getPackagesAwaitingArrival()}>Go</Button>
                            </FormControl>
                        </div>
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
                </div>
            </React.Fragment>
        );
    }
}

ArrivalScan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArrivalScan);