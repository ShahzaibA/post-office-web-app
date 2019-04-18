import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import './Invoice.css';

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

class Invoice extends React.Component {
    state = {
        InvoiceID: "0",
        data: [],
        numPerRow: 7,
        first: 0,
        FName: "",
        LName: "",
        curID: 0,
        trackingIDS: [],
        done: true,
    }

    getFromLocal_Invoice() {
        this.state.InvoiceID = localStorage.getItem("sender_ID");
        //We do not remove the current "logged in" user here.
        //localStorage.removeItem("InvoiceID");
    }

    componentDidMount() {
        this.state.first = 0;
        this.getFromLocal_Invoice();
        this.getInvoice();
    }

    getInvoice() {
        fetch('http://68.183.131.116:4000/get_invoices', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender_id: this.state.InvoiceID
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.data.length !== 0) {
                    this.setState({ done: false })
                    this.setState({ data: result.data, FName: result.data[0].FName, LName: result.data[0].LName })
                }
                else {
                    this.setState({ InvoiceID: -1 })
                    this.setState({ done: false })
                }
            })
            .catch(err => this.setState({ InvoiceID: -1 }))

    }

    getID() {
        this.state.curID = this.state.curID + 1;
        return this.state.curID - 1;
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
            this.state.first = this.state.first + 1;
            //return { fontWeight: 'bold', backgroundColor: '#ededed' };
        }
        else {
            //return { fontWeight: 'none', backgroundColor: '#ffffff' };
        }
    }
    setTrackingID(rowPID) {
        localStorage.setItem('Tracking_ID', rowPID);
        window.location.replace("/tracking")
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                {this.state.done ?
                    (<Fragment><div className='invoice-page-bg'>
                        <div className={classes.wrapper}>
                            <Paper className={classes.root} style={{ padding: 50 }}><h1 fontWeight={1000}>Loading...</h1></Paper></div>
                    </div></Fragment>) :
                    (<Fragment>{this.state.InvoiceID > 0 ? (
                        <div className='invoice-page-bg'>
                            <div className={classes.wrapper}>
                                <Paper className={classes.root} style={{ padding: 50 }}>
                                    <Typography variant="h3" as="div" align="left" >
                                        Invoices for {this.state.FName} {this.state.LName}
                                    </Typography>
                                    <Divider className={classes.overrider}></Divider>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Date</TableCell>
                                                <TableCell align="left">Time</TableCell>
                                                <TableCell align="left">TrackingID</TableCell>
                                                <TableCell align="left">Receiver Name</TableCell>
                                                <TableCell align="left">Receiver Address</TableCell>
                                                <TableCell align="left">Price</TableCell>
                                                <TableCell align="left">Weight</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.data.map(row => (
                                                <TableRow key={row.id} >
                                                    <TableCell align="left" style={this.checkFirst()}>{row.Date.substring(5, 7) + "/" + row.Date.substring(8, 10) + "/" + row.Date.substring(0, 4)}</TableCell>
                                                    <TableCell align="left" style={this.checkFirst()}>{this.translateTime(row.Time)} </TableCell>
                                                    <TableCell align="left" style={this.checkFirst()}>
                                                        <ul align="left"><a href="/tracking" onClick={() => this.setTrackingID(row.Package_ID)} >{row.Package_ID}</a></ul>
                                                    </TableCell>
                                                    <TableCell align="left" style={this.checkFirst()}>{row.ReceiverFirstName} {row.ReceiverLastName}</TableCell>
                                                    <TableCell align="left" style={this.checkFirst()}>{row.ReceiverAddr}</TableCell>
                                                    <TableCell align="left" style={this.checkFirst()}>${row.Price}</TableCell>
                                                    <TableCell align="left" style={this.checkFirst()}>{row.Weight} lb</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper >
                            </div>
                        </div>) :
                        (<div className={classes.wrapper}>
                            <Paper style={{ padding: 50 }}>
                                <Typography variant="h1" as="div" align="center" >
                                    No invoices could be found.
                    </Typography>
                            </Paper>
                        </div>
                        )
                    }</Fragment>
                    )
                }
            </Fragment>
        )
    }
}

Invoice.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Invoice);