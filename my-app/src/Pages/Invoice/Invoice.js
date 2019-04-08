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

class Invoice extends React.Component {
    state = {
        InvoiceID: "0",
        data: [],
        numPerRow: 6,
        first: 0,
    }

    getFromLocal_Invoice() {
        this.state.InvoiceID = localStorage.getItem("InvoiceID");
        //We do not remove the current "logged in" user here.
        //localStorage.removeItem("InvoiceID");
    }

    componentDidMount() {
        this.state.first = 0;
        this.getFromLocal_Invoice();
        this.getInvoice();
    }

    getInvoice() {
        fetch('http://localhost:4000/get_invoices', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender_id: this.state.InvoiceID
            })
        })
            .then(res => res.json())
            .then(result => this.setState({ data: result.data }))
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

    checkFirst() {
        if (this.state.first < this.state.numPerRow) {
            this.state.first += 1;
            return { fontWeight: 'bold', backgroundColor: '#ededed' };
        }
        else {
            return { fontWeight: 'none', backgroundColor: '#ffffff' };
        }
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.data);
        console.log(this.state.status_types);
        return (
            <div className={classes.wrapper}>
                <Typography variant="h3" as="div" align="left" >
                    Invoices for User
                </Typography>
                <Divider className={classes.overrider}></Divider>

                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Time</TableCell>
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
                                    <TableCell align="left" style={this.checkFirst()}>{row.ReceiverFirstName} {row.ReceiverLastName}</TableCell>
                                    <TableCell align="left" style={this.checkFirst()}>{row.ReceiverAddr}</TableCell>
                                    <TableCell align="left" style={this.checkFirst()}>{row.Price}</TableCell>
                                    <TableCell align="left" style={this.checkFirst()}>{row.Weight} lb</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper >
            </div>
        )
    }
}

Invoice.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Invoice);