import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends React.Component {
    state = {
        employee_email: "",
        password: "",
        loggedIn: false,
        info: []
    }

    loginEmployee = () => {
        fetch('http://localhost:4000/login_employee', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                employee_email: this.state.employee_email,
                password: this.state.password,
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.data.length !== 0) {
                    localStorage.setItem('employee_email', result.data[0].Email);
                    localStorage.setItem('job_title', result.data[0].JobTitle)
                    this.setState({ loggedIn: true })
                }
            })
            .catch(err => console.log(err))
    }

    handleChange = (name, val) => {
        this.setState({ [name]: val });
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.info);
        if (this.state.loggedIn) {
            window.location.replace('/');
        }
        else {
            return (
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Employee Sign in
                        </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input
                                    id="employee_email"
                                    name="employee_email"
                                    onChange={e => this.handleChange(e.target.name, e.target.value)}
                                    autoComplete="employee_email"
                                    autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    onChange={e => this.handleChange(e.target.name, e.target.value)}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password" />
                            </FormControl>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={this.loginEmployee}
                                color="primary"
                            >
                                Sign in
                            </Button>
                        </form>
                    </Paper>
                </main>
            );
        }
    }

}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);