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
import { BrowserRouter as Link } from 'react-router-dom';
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
    state = {
        TrackingID: 0,
        data: [],
        numPerRow: 4,
        first: 0,
    }

    getFromLocal_Tracking() {
        this.state.TrackingID = localStorage.getItem("Tracking_ID");
    }

    componentDidMount() {
        this.state.TrackingID= 0;
        this.getFromLocal_Tracking();
        this.getShipStatus();
    }

    getShipStatus() {
        fetch('http://68.183.131.116:4000/get_shipstatus', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                package_id: this.state.TrackingID
            })
        })
            .then(res => res.json())
            .then(result => this.setState({ data: result.data }))
            .catch(err => console.log(err))

    }
    translateTime(time) {
        if (parseInt(time.substring(0, 2)) < 13) {
            if (parseInt(time.substring(0, 2)) < 10) {
                return time.substring(1, 5) + " AM"
            }
            return time.substring(0, 5) + " AM"
        }
        else {
            return (parseInt(time.substring(0, 2)) - 12).toString() + time.substring(2, 5) + " PM"
        }
    }

    checkFirst() {
        if (this.state.first < this.state.numPerRow) {
            this.state.first = this.state.first+1;
            return { fontWeight: 'bold', backgroundColor: '#ededed' };
        }
        else {
            return { fontWeight: 'none', backgroundColor: '#ffffff' };
        }
    }

    render() {
        const { classes } = this.props;
        return (
            < div className={classes.wrapper} >
                {this.state.TrackingID < 1 || this.state.data.length < 1 ?
                    (<Paper>
                        <Typography variant="h3" as="div" align="center" style={{ padding: 50 }} >
                            Sorry, we could not find that package.
                    </Typography>

                        <Typography variant="h5" as="div" align="center" style={{ padding: 50 }}>
                            Try your search again from <a href="/"><Link to="/">Home.</Link></a>
                        </Typography>
                    </Paper>) :

                    (<Paper className={classes.root} style={{ padding: 50 }}>
                        <Typography variant="h3" as="div" align="left" >
                            TrackingID - #{this.state.TrackingID}
                        </Typography>
                        <Divider className={classes.overrider}></Divider>
                        <Typography variant="h5" as="div" align="left" fontWeight={600} fontSize="h1.fontSize" >
                            Tracking Details:
                            </Typography>
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
                                    < TableRow>
                                        <TableCell align="left" style={this.checkFirst()}>{this.translateTime(row.Time)} </TableCell>
                                        <TableCell align="left" style={this.checkFirst()}>{row.Date.substring(5, 7) + "/" + row.Date.substring(8, 10) + "/" + row.Date.substring(0, 4)}</TableCell>
                                        <TableCell align="left" style={this.checkFirst()}>{row.Status_Type === "Delivered" ? row.ReceiverAddr : row.Addr}</TableCell>
                                        <TableCell align="left" style={this.checkFirst()}>{row.Status_Type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper >)
                }
            </div >
        )
    }
}

Tracking.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tracking);