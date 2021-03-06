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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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

class AssignDelivery extends Component {
    state = {
        packages: [],
        hubs: [],
        status_types: [],
        drivers: [],
        hub_location: "",
        open: false,
        Package_ID: "",
        route_to_state: "",
        Shipping_State_Abbr: "",
        driver_ID: "",
    }

    componentDidMount() {
        this.getPackagesToDeliver();
        this.getHubs();
    }

    handleChange = (name, val) => {
        this.setState({ [name]: val });
    };

    handleClickOpen(Package_ID, Shipping_State_Abbr) {
        this.setState({
            open: true,
            Package_ID: Package_ID,
            Shipping_State_Abbr: Shipping_State_Abbr,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    getHubs() {
        fetch('http://68.183.131.116:4000/get_hubs'
        )
            .then(res => res.json())
            .then(Response => this.setState({ hubs: Response.data }))
            .catch(err => console.log(err))
    }

    getDrivers() {
        fetch('http://68.183.131.116:4000/get_drivers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Hub_Location: this.state.hub_location,
            })
        })
            .then(res => res.json())
            .then(Response => this.setState({ drivers: Response.drivers }))
            .catch(err => console.log(err))
    }

    getPackagesToDeliver() {
        fetch('http://68.183.131.116:4000/get_packages_to_deliver', {
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
            .then(this.getDrivers())
            .catch(err => console.log(err))
    }

    sendOutForDelivery = () => {
        fetch('http://68.183.131.116:4000/send_out_for_delivery', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Package_ID: this.state.Package_ID,
                Hub_ID: this.state.hub_location,
                Driver_ID: this.state.driver_ID,
            })
        })
            .then(this.handleClose)
            .then(() => this.getPackagesToDeliver())
            .then(this.handleClose)
    }

    renderDialogComponent() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            id="Package_ID"
                            label="Package ID"
                            value={this.state.Package_ID}
                            type="Package_ID"
                            disabled="true"
                            fullWidth
                        />
                        <TextField
                            required
                            id="driver_ID"
                            select
                            variant="standard"
                            name="driver_ID"
                            value={this.state.driver_ID}
                            label="Select Driver"
                            fullWidth
                            onChange={e => this.handleChange(e.target.name, e.target.value)}

                        >
                            {this.state.drivers.map(option => (
                                <MenuItem key={option.ID} value={option.ID}>
                                    {option.FName + ' ' + option.LName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.sendOutForDelivery} color="secondary">
                            Send Out For Delivery
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    renderPackageList = ({ Package_ID, Shipping_Address, Shipping_City, Shipping_State_Abbr, Shipping_Zip, Hub_ID }) =>
        <TableRow key={Package_ID}>
            <TableCell component="th" scope="row">{Package_ID}</TableCell>
            <TableCell align="right">{Shipping_Address}</TableCell>
            <TableCell align="right" onClick="">{Shipping_City}</TableCell>
            <TableCell align="right">{Shipping_State_Abbr}</TableCell>
            <TableCell align="right">{Shipping_Zip}</TableCell>
            <TableCell align="right"><Button size='sm' variant="outline-danger" onClick={() => this.handleClickOpen(Package_ID, Hub_ID)} >Send Out For Delivery</Button></TableCell>
        </TableRow>

    render() {
        const { classes } = this.props;
        const { packages } = this.state;
        console.log(this.state.Package_ID)
        return (
            <React.Fragment>
                <div class="container" style={{ padding: 50 }}>
                    <Paper className={classes.root} style={{ padding: 50 }}>
                        <h1>Assign Delivery</h1>
                        {this.renderDialogComponent()}
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
                                <Button onClick={() => this.getPackagesToDeliver()}>Go</Button>
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
                                    <TableCell align="right" className={classes.header}>Route Package</TableCell>
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

AssignDelivery.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AssignDelivery);