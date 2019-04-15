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
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        paddingTop: theme.spacing.unit * 8,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
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
        username: "",
        password: "",
        sender_ID: "",
        loggedIn: false,
        auth: true,
        fetch: true,
        info: [],
    }

    loginUser = () => {
        fetch('http://68.183.131.116:4000/login_user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.data.length !== 0) {
                    localStorage.setItem('sender_ID', result.data[0].Sender_ID);
                    this.setState({ loggedIn: true })
                }
                else{
                    setTimeout(
                        function(){
                            this.setState({auth: false})
                        }
                        .bind(this)
                        .then(this.setState({auth:true}))
                    ,1000)
                }
            })
            .catch(err => this.setState({auth:false}))
    }

    handleChange = (name, val) => {
        this.setState({ [name]: val });
    }

    handleClose = () => {
        this.setState({
            auth: true,
        });
    };

    render() {
        const { classes } = this.props;
        console.log(this.state.info);
        if (this.state.loggedIn) {
            window.location.replace('/');
        }
        else {
            return (
                <div className="bg" style ={{paddingBottom: '60px'}}>
                    <main className={classes.main}>
                        <CssBaseline />
                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Sign in
                        </Typography>
                            <form className={classes.form}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">Username</InputLabel>
                                    <Input
                                        id="username"
                                        name="username"
                                        onChange={e => this.handleChange(e.target.name, e.target.value)}
                                        autoComplete="username"
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
                                    onClick={this.loginUser}
                                    color="primary"
                                >
                                    Sign in
                            </Button>
                            <Dialog
                                open={!this.state.auth}
                                onClose={this.handleClose}>
                                <DialogTitle>
                                    <DialogContent>
                                        Invalid username or password.
                                    </DialogContent>
                                </DialogTitle>
                            </Dialog>
                            </form>
                        </Paper>
                        <Typography style={{ marginTop: '10px' }}>Don't Have an Account?&ensp;
                    <Button
                                href="/register"
                                variant="outlined"
                                color="primary"
                                size="small"
                                style={{ textTransform: 'none' }}
                            >Register</Button></Typography>
                        <Typography style={{ marginTop: '10px' }}>Are You An Employee?&ensp;
                    <Button
                                href="/employee_login"
                                variant="outlined"
                                color="primary"
                                size="small"
                                style={{ textTransform: 'none' }}
                            >Log In</Button></Typography>
                    </main>
                </div>
            );
        }
    }

}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);