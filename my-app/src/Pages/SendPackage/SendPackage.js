import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PaymentForm from './PaymentForm';
import Review from './Review';
import ShipFrom from './ShipFrom';
import ShipTo from './ShipTo';
import PackageInformation from './PackageInformation';

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

const steps = ['Ship From', 'Ship To', 'Package Information', 'Payment', 'Review'];

class SendPackage extends React.Component {
  state = {
    activeStep: 0,
    sender_firstName: "",
    sender_lastName: "",
    sender_address1: "",
    sender_apartment: "",
    sender_city: "",
    sender_state: "",
    sender_zip: "",
    sender_country: "",
    sender_email: "",
    sender_phone: "",
    receiver_firstName: "",
    receiver_lastName: "",
    receiver_address: "",
    receiver_apartment: "",
    receiver_city: "",
    receiver_state: "",
    receiver_zip: "",
    receiver_country: "",
    packageType: "",
    packageWeight: "",
    price: ""
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return <ShipFrom handleChange={this.handleChange} val={this.state} />;
      case 1:
        return <ShipTo handleChange={this.handleChange} val={this.state} />;
      case 2:
        return <PackageInformation handleChange={this.handleChange} val={this.state} />;
      case 3:
        return <PaymentForm handleChange={this.handleChange} val={this.state} />;
      case 4:
        return <Review handleChange={this.handleChange} val={this.state} />
      default:
        throw new Error('Unknown step');
    }
  }

  validateNextButton(step) {
    switch (step) {
      case 0:
        return (this.state.sender_firstName.length > 0 && this.state.sender_lastName.length > 0 && this.state.sender_address1.length > 0 && this.state.sender_city.length > 0 &&
          this.state.sender_state.length > 0 && this.state.sender_zip.length > 0 && this.state.sender_country.length > 0 && this.state.sender_email.length > 0 && this.state.sender_phone.length > 0);
      case 1:
        return (this.state.receiver_firstName.length > 0 && this.state.receiver_lastName.length > 0 && this.state.receiver_address.length > 0 && this.state.receiver_city.length > 0 &&
          this.state.receiver_state.length > 0 && this.state.receiver_zip.length > 0 && this.state.receiver_country.length > 0);
      case 2:
        return (this.state.packageType.length > 0 && this.state.packageWeight.length > 0);
      default:
        return true;
    }
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
              Send Package
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
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order confirmation, and will
                    send you an update when your order has shipped.
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
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!this.validateNextButton(activeStep)}
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Create Label' : 'Next'}
                      </Button>
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

SendPackage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SendPackage);