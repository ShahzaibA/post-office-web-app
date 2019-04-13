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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class ManageEmployees extends React.Component {
    state = {
        employees: [],
        job_titles: [],
        hubs: [],
        open: false,
        FName: "",
        LName: "",
        Email: "",
        JobTitle_ID: "",
        Hub_ID: "",
        VIN: "",
    }

    componentDidMount() {
        this.getEmployees()
        this.getJobTitles()
        this.getHubs()
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

    createEmployee = () => {
        console.log("Creating Employee");
        fetch('http://localhost:4000/create_employee', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                FName: this.state.FName,
                LName: this.state.LName,
                Email: this.state.Email,
                JobTitle_ID: this.state.JobTitle_ID,
                Hub_ID: this.state.Hub_ID,
            })
        })
            .then(this.handleClose)
            .then(this.getEmployees())
            .catch(err => console.log(err))

    }

    createDriverEmployee = () => {
        fetch('http://localhost:4000/create_driver_employee', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                FName: this.state.FName,
                LName: this.state.LName,
                Email: this.state.Email,
                JobTitle_ID: this.state.JobTitle_ID,
                Hub_ID: this.state.Hub_ID,
                VIN: this.state.VIN
            })
        })
            .then(this.handleClose)
            .then(this.getEmployees())
            .catch(err => console.log(err))

    }

    getJobTitles() {
        fetch('http://localhost:4000/get_job_titles')
            .then(res => res.json())
            .then(result => this.setState({ job_titles: result.data }))
    }

    getHubs() {
        fetch('http://localhost:4000/get_hubs')
            .then(res => res.json())
            .then(result => this.setState({ hubs: result.data }))
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
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoFocus
                                    id="FName"
                                    label="First Name"
                                    name="FName"
                                    value={this.state.FName}
                                    type="FName"
                                    fullWidth
                                    onChange={e => this.handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoFocus
                                    id="LName"
                                    label="Last Name"
                                    name="LName"
                                    value={this.state.LName}
                                    type="LName"
                                    fullWidth
                                    onChange={e => this.handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoFocus
                                    id="Email"
                                    label="Email"
                                    name="Email"
                                    value={this.state.Email}
                                    type="Email"
                                    fullWidth
                                    onChange={e => this.handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="JobTitle_ID"
                                    select
                                    variant="standard"
                                    name="JobTitle_ID"
                                    value={this.state.JobTitle_ID}
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="Hub_ID"
                                    select
                                    variant="standard"
                                    name="Hub_ID"
                                    value={this.state.Hub_ID}
                                    label="Select Location"
                                    fullWidth
                                    onChange={e => this.handleChange(e.target.name, e.target.value)}
                                >
                                    {this.state.hubs.map(hub => (
                                        <MenuItem key={hub.Hub_ID} value={hub.Hub_ID}>
                                            {hub.Addr + ", " + hub.City_Name + ", " + hub.State_Abbr + ", " + hub.Zip}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {this.state.JobTitle_ID === 2 ? (
                                <Grid item xs={12}>
                                    <Typography variant="h6" align="center" gutterBottom>
                                        Enter Vehicle Details
                                    </Typography>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoFocus
                                            id="VIN"
                                            label="VIN # (17 Characters)"
                                            inputProps={{
                                                maxLength: 17,
                                            }}
                                            name="VIN"
                                            value={this.state.VIN}
                                            fullWidth
                                            onChange={e => this.handleChange(e.target.name, e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            ) : (
                                    <div></div>
                                )}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={this.state.JobTitle_ID === 2 ? (this.createDriverEmployee) : (this.createEmployee)}
                            color="secondary">
                            Add Employee
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.JobTitle_ID)
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
                                <TableCell align="left">Location</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.employees.map(employee => (
                                < TableRow>
                                    <TableCell align="left">{employee.ID} </TableCell>
                                    <TableCell align="left">{employee.FName + " " + employee.LName}</TableCell>
                                    <TableCell align="left">{employee.Email}</TableCell>
                                    <TableCell align="left">{employee.JobTitle}</TableCell>
                                    <TableCell align="left">{employee.Addr + ", " + employee.City_Name + ", " + employee.State_Abbr + ", " + employee.Zip}</TableCell>
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