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

let id = 0;
function createData(DateTime, Location, Status) {
    id += 1;
    return { id, DateTime, Location, Status };
}

const rows = [
    createData('2/24/19', 'Nice Lane', 'Package Processing'),
    createData('2/25/19', 'Calhoun Road', 'In Transit'),
    createData('2/27/19', 'alright location', 'In Transit'),
    createData('2/30/19', 'Some place', 'Package Arrived'),
];

class Tracking extends React.Component {
    current = {
        numRows: 5
    }

    state = {
        numRows: 5,

        CurrentTracking: 0,
        NameObject: "NameObject",
        TrackingID: 0,
        Status: "Status",
        Location: "Location",
        DateTime: "DateTime",
        Color: "Color",
        data: [],
    }

    componentDidMount() {
        this.getShipStatus();
    }

    getShipStatus() {
        fetch('http://localhost:4000/get_shipstatus')
            .then(res => res.json())
            .then(Response => this.setState({ data: Response.data }))
            .catch(err => console.log(err))
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.data);
        return (
            <div className={classes.wrapper}>
                <Typography variant="h3" as="div" align="left" style={{ padding: 10 }} >
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
                                <TableCell align="left">DateTime</TableCell>
                                <TableCell align="left">Location</TableCell>
                                <TableCell align="left">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell align="left">{row.DateTime}</TableCell>
                                    <TableCell align="left">{row.Hub_ID}</TableCell>
                                    <TableCell align="left">{row.Status_ID}</TableCell>
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