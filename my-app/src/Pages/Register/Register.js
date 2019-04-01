import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import LoginDetails from './LoginDetails';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 750,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
    stepper: {
        padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    },
});

const steps = ['Login Details', 'Account Information'];

class Register extends React.Component {
    state = {
        activeStep: 0,
        sender_firstName: "",
        sender_lastName: "",
        sender_address: "",
        sender_apartment: "",
        sender_city: "",
        sender_state: "",
        sender_zip: "",
        sender_country: "",
        sender_email: "",
        sender_phone: "",
        states: [],
        username: "",
        password: "",
        isAvailable: false,
    };

    componentDidMount() {
        this.getStates();
    }

    getStates() {
        fetch('http://localhost:4000/get_states'
        )
            .then(res => res.json())
            .then(Response => this.setState({ states: Response.states }))
            .catch(err => console.log(err))
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return <LoginDetails handleChange={this.handleChange} val={this.state} />;
            default:
                throw new Error('Unknown step');
        }
    }

    validateNextButton(step) {
        switch (step) {
            case 0:
                return (this.state.username.length > 0 && this.state.password.length > 0)
            default:
                return true;
        }
    }

    redirectUser() {
        return <Redirect to={{ pathname: '/' }} />;
    }

    handleChange = (name, val) => {
        this.setState({ [name]: val });
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;
        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Create An Account
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                < React.Fragment >
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your order.
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Your order number is #{this.state.invoice_ID} and your tracking number is #{this.state.tracking_ID}. We have emailed you your order confirmation and shipping label, and will
                                        send you an update when your order has been delivered.
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                    <React.Fragment>
                                        {this.getStepContent(activeStep)}
                                        <div className={classes.buttons}>
                                            {activeStep !== 0 && (
                                                <Button onClick={this.handleBack} className={classes.button}>
                                                    Back
                                                </Button>
                                            )}
                                            {activeStep === steps.length - 1 ? (<Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.sendPackageData}
                                                className={classes.button}
                                            >Create Label</Button>) : (<Button
                                                variant="contained"
                                                color="primary"
                                                disabled={!this.validateNextButton(activeStep)}
                                                onClick={this.handleNext}
                                                className={classes.button}
                                            >Next</Button>)}
                                        </div>
                                    </React.Fragment>
                                )}
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);