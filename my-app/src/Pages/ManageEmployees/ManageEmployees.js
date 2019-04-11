import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    button: {
        margin: theme.spacing.unit,
    },
});

class ManageEmployees extends React.Component {
    state = {
        employees: [],
        job_titles: [],
        open: false,
        FName: "",
        LName: "",
        Email: "",
        JobTitle: "",
    }

    componentDidMount() {
        this.getEmployees()
        this.getJobTitles()
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (name, val) => {
        this.setState({ [name]: val });
    };

    getEmployees() {
        fetch('http://localhost:4000/get_employees', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Employee_Email: localStorage.getItem('employee_email')
            })
        })
            .then(res => res.json())
            .then(result => this.setState({ employees: result.data }))
            .catch(err => console.log(err))

    }

    getJobTitles() {
        fetch('http://localhost:4000/get_job_titles')
            .then(res => res.json())
            .then(result => this.setState({ job_titles: result.data }))
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
                            id="FName"
                            label="First Name"
                            value={this.state.FName}
                            type="FName"
                            fullWidth
                            onChange={e => this.handleChange(e.target.name, e.target.value)}
                        />
                        <TextField
                            autoFocus
                            id="LName"
                            label="Last Name"
                            value={this.state.LName}
                            type="LName"
                            fullWidth
                            onChange={e => this.handleChange(e.target.name, e.target.value)}
                        />
                        <TextField
                            autoFocus
                            id="Email"
                            label="Email"
                            value={this.state.Email}
                            type="Email"
                            fullWidth
                            onChange={e => this.handleChange(e.target.name, e.target.value)}
                        />
                        <TextField
                            required
                            id="JobTitle"
                            select
                            variant="standard"
                            name="JobTitle"
                            value={this.state.JobTitle}
                            label="Job Title"
                            fullWidth
                            onChange={e => this.handleChange(e.target.name, e.target.value)}

                        >
                            {this.state.job_titles.map(title => (
                                <MenuItem key={title.JobTitle_ID} value={title.JobTitle_ID}>
                                    {title.JobTitle}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.sendOutForDelivery} color="secondary">
                            Add Employee
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.job_titles);
        return (
            < div className={classes.wrapper} >
                {this.renderDialogComponent()}
                <Button variant="contained" className={classes.button} onClick={this.handleClickOpen}>
                    Add Employee
                </Button>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Employee ID</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Job Title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.employees.map(employee => (
                                < TableRow>
                                    <TableCell align="left">{employee.ID} </TableCell>
                                    <TableCell align="left">{employee.FName + " " + employee.LName}</TableCell>
                                    <TableCell align="left">{employee.Email}</TableCell>
                                    <TableCell align="left">{employee.JobTitle}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper >
            </div >
        )
    }
}

ManageEmployees.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageEmployees);