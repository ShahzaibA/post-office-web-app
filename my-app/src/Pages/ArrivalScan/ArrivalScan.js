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
import Grow from '@material-ui/core/Grow';
import { Done } from '@material-ui/icons';

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
        hubs: [],
        hub_location: "",
        activeButton: "",
        disabled: false,
    }

    componentDidMount() {
        this.getPackagesAwaitingArrival();
        this.getHubs();
    }

    handleChange = (name, val) => {
        this.setState({ [name]: val });
    };

    getHubs() {
        fetch('http://68.183.131.116:4000/get_hubs'
        )
            .then(res => res.json())
            .then(Response => this.setState({ hubs: Response.data }))
            .catch(err => console.log(err))
    }

    getPackagesAwaitingArrival() {
        fetch('http://68.183.131.116:4000/get_packages_awaiting_arrival', {
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
        this.setState({ activeButton: Package_ID })
        setTimeout(
            function () {
                fetch('http://68.183.131.116:4000/arrival_scan', {
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
                .bind(this),
            2000
        );
    }

    renderPackageList = ({ Package_ID, Shipping_Address, Shipping_City, Shipping_State_Abbr, Shipping_Zip, Hub_ID }) =>
        <TableRow key={Package_ID}>
            <TableCell component="th" scope="row">{Package_ID}</TableCell>
            <TableCell align="right">{Shipping_Address}</TableCell>
            <TableCell align="right">{Shipping_City}</TableCell>
            <TableCell align="right">{Shipping_State_Abbr}</TableCell>
            <TableCell align="right">{Shipping_Zip}</TableCell>
            <TableCell align="right">
                {this.state.activeButton !== Package_ID ?
                    (<Button id={'Button-' + Package_ID} size='sm' variant="outline-danger" onClick={() => this.arrivalScan(Package_ID, Hub_ID)} >
                        Scan Arrival
                    </Button>) :
                    (<Button disabled={true} size='sm' variant="outline-danger">
                        <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...(true ? { timeout: 1000, } : {})}>
                            <Done>Scanned</Done>
                        </Grow>
                    </Button>
                    )
                }
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
                                    {this.state.hubs.map(hub => (
                                        <MenuItem key={hub.State_Abbr} value={hub.State_Abbr}>
                                            {hub.Addr + ", " + hub.City_Name + ", " + hub.State_Abbr + ", " + hub.Zip}
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