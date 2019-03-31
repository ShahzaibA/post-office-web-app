import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//Tracking Local Imports
import './Tracking.css'
import { Grid } from '@material-ui/core';


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});
class Tracking extends Component {

    //Each view has a tuple of given information to print
    state = {
        NameObject: "NameObject",
        TrackingID: 0,
        Status: "Status",
        Location: "Location",
        DateTime: "DateTime",
        CurrentTracking: 0,
        Color: "Color",
        data: [],
        numRows: 5,
    }

    GenRows() {
        return this.state.data.map(Rows => {
            return <TableRow>
                <CustomTableCell align="right">{this.state.CurrentTracking}</CustomTableCell >
                <CustomTableCell align="right">{this.state.DateTime}</CustomTableCell>
                <CustomTableCell align="right">{this.state.Location}</CustomTableCell>
                <CustomTableCell align="right">{this.state.Status}</CustomTableCell>
            </TableRow >
        })
    }

    UpdateRows() {
        for (var i = 0; i < this.state.numRows; i++) {

        }
    }

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({ height: event.target.value });
    };

    render() {
        return (
            <div>
                <Grid>
                    Tracking Details:
                </Grid>
                <Grid item xs={6}>
                    {this.state.NameObject}
                </Grid>
                <Grid item xs={6}>
                    {this.state.TrackingID}
                </Grid>
                <Table style={{ width: "70%" }}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="right">
                                EntryNum
                            </CustomTableCell>
                            <CustomTableCell align="right">
                                DateTime
                            </CustomTableCell>
                            <CustomTableCell align="right">
                                Location
                            </CustomTableCell>
                            <CustomTableCell align="right">
                                Status
                            </CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.data.map(Rows)} => (
                    <TableRow>
                            <CustomTableCell align="right">{this.state.CurrentTracking}</CustomTableCell >
                            <CustomTableCell align="right">{this.state.DateTime}</CustomTableCell>
                            <CustomTableCell align="right">{this.state.Location}</CustomTableCell>
                            <CustomTableCell align="right">{this.state.Status}</CustomTableCell>
                        </TableRow >)}
                    </TableBody>
                </Table>
            </div>
        )
    }
}
export default Tracking;