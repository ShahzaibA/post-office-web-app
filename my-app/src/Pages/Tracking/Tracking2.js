
import React from 'react';

import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';

import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';

import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';

import { spacing } from '@material-ui/system';

import { Divider } from '@material-ui/core';



const styles = theme => ({

    overrider: {

        margin: "5px",

    },

    wrapper: {

        width: "70%",

        margin: "0 auto",

        padding: "70px 0 0 0"

    },

    root: {

        align: "center",

        width: "100%",

        marginTop: theme.spacing.unit * 3,

        overflowX: 'auto',

        padding: 10,

    },

    table: {

        minWidth: 700,

    },

});



class Tracking extends React.Component {

    current = {

        numRows: 5

    }



    state = {

        numRows: 5,



        rowHub: "",

        data: [],

        ret: [],

        status_types: [],

    }



    componentDidMount() {

        this.getShipStatus();

        this.getStatus_Types();

    }



    getShipStatus() {

        fetch('http://localhost:4000/get_shipstatus')

            .then(res => res.json())

            .then(Response => this.setState({ data: Response.data }))

            .catch(err => console.log(err))

    }



    getTrackingHub = () => {

        fetch('http://localhost:4000/get_tracking_hub', {

            method: "GET",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({ Hub_ID: this.state.rowHub })

        })

            .then(res => res.json())

            .then(Response => this.setState({ ret: Response.ret }))

            .catch(err => console.log(err))

        return this.state.ret;

    }





    getStatus_Types() {

        fetch('http://localhost:4000/get_status_types')

            .then(res => res.json())

            .then(Response => this.setState({ status_types: Response.status_types }))

            .catch(err => console.log(err))



    }



    translateTime(time) {

        if (parseInt(time.substring(0, 1)) < 11) {

            if (parseInt(time.substring(0, 1)) < 10) {

                return time.substring(1, 5) + " AM"

            }

            return time.substring(0, 5) + " AM"

        }

        else {

            return time.substring(0, 5) + " PM"

        }

    }



    translateStatus(stat) {

        if (stat == 1) return "Processing Package";

        else if (stat == 2) return "Package Processed";

        else if (stat == 3) return "In Transit";

        else if (stat == 4) return "Out For Delivery";

        else if (stat == 5) return "Package Delivered";

    }

    /*

    <TableCell align="left">{row.Hub_ID}</TableCell>

    <TableCell align="left">{this.getTrackingHub(this.state.rowHub = row.Hub_ID)}</TableCell>

    <TableCell align="left">{this.translateStatus(row.State)}</TableCell>

    */



    render() {

        const { classes } = this.props;

        console.log(this.state.data);

        console.log(this.state.status_types);

        return (

            <div className={classes.wrapper}>

                <Typography variant="h3" as="div" align="left" >

                    Object Name - TrackingID

                    </Typography>

                <Divider className={classes.overrider}></Divider>

                <Typography variant="h5" as="div" align="left" fontWeight={600} fontSize="h1.fontSize" >

                    Tracking Details:

                    </Typography>



                <Paper className={classes.root}>

                    <Table className={classes.table}>

                        <TableHead>

                            <TableRow>

                                <TableCell align="left">Time</TableCell>

                                <TableCell align="left">Date</TableCell>

                                <TableCell align="left">Location</TableCell>

                                <TableCell align="left">Status</TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {this.state.data.map(row => (

                                <TableRow key={row.id} >

                                    <TableCell align="left">{this.translateTime(row.Time)} </TableCell>

                                    <TableCell align="left">{row.Date.substring(5, 7) + "/" + row.Date.substring(8, 10) + "/" + row.Date.substring(0, 4)}</TableCell>

                                    <TableCell align="left">{row.Hub_ID}</TableCell>

                                    <TableCell align="left">{this.translateStatus(row.Status_ID)}</TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </Paper >

            </div>

        )

    }

}



Tracking.propTypes = {

    classes: PropTypes.object.isRequired,

};



export default withStyles(styles)(Tracking);
