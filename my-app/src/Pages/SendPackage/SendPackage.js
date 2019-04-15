
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
import PaymentForm from './PaymentForm';
import Review from './Review';
import ShipFrom from './ShipFrom';
import ShipTo from './ShipTo';
import PackageInformation from './PackageInformation';
import { Redirect } from "react-router-dom";
import './SendPackage.css';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    paddingTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 750,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      paddingTop: theme.spacing.unit * 6,
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
    sender_address: "",
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
    package_type: "",
    package_weight: "",
    quantity: 1,
    price: "",
    states: [],
    package_types: [],
    invoice_ID: "",
    tracking_ID: "",
  };

  componentDidMount() {
    this.getStates();
    this.getPackageTypes();
    this.getSenderInformation()
  }

  getStates() {
    fetch('http://localhost:4000/get_states'
    )
      .then(res => res.json())
      .then(Response => this.setState({ states: Response.states }))
      .catch(err => console.log(err))
  }

  getPackageTypes() {
    fetch('http://localhost:4000/get_package_types'
    )
      .then(res => res.json())
      .then(Response => this.setState({ package_types: Response.package_types }))
      .catch(err => console.log(err))
  }

  getSenderInformation() {
    if (localStorage.getItem('sender_ID') !== null) {
      fetch('http://localhost:4000/get_sender_information', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Sender_ID: localStorage.getItem('sender_ID'),
        })
      })
        .then(res => res.json())
        .then(Response => this.setState({
          sender_firstName: Response.data[0].FName,
          sender_lastName: Response.data[0].LName,
          sender_address: Response.data[0].Addr1,
          sender_city: Response.data[0].City_Name,
          sender_state: Response.data[0].State_Abbr,
          sender_zip: Response.data[0].Zip.toString(),
          sender_country: Response.data[0].Country_Name,
          sender_email: Response.data[0].Email,
          sender_phone: Response.data[0].Phone,
        }))
        .then()
        .catch(err => console.log(err))
    }
  }

  sendPackageData = () => {
    fetch('http://localhost:4000/create_order', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender_firstName: this.state.sender_firstName,
        sender_lastName: this.state.sender_lastName,
        sender_address: this.state.sender_address,
        sender_apartment: this.state.sender_apartment,
        sender_city: this.state.sender_city,
        sender_state: this.state.sender_state,
        sender_zip: this.state.sender_zip,
        sender_country: this.state.sender_country,
        sender_email: this.state.sender_email,
        sender_phone: this.state.sender_phone,
        receiver_firstName: this.state.receiver_firstName,
        receiver_lastName: this.state.receiver_lastName,
        receiver_address: this.state.receiver_address,
        receiver_apartment: this.state.receiver_apartment,
        receiver_city: this.state.receiver_city,
        receiver_state: this.state.receiver_state,
        receiver_zip: this.state.receiver_zip,
        receiver_country: this.state.receiver_country,
        package_type: this.state.package_type,
        package_weight: this.state.package_weight,
        quantity: 1,
        price: this.state.price,
      })
    })
      .then(res => res.json())
      .then(Response => this.setState({ invoice_ID: Response.invoice_ID, tracking_ID: Response.tracking_ID }))
      .then(this.handleNext)
      .catch(err => console.log(err))

  }

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
        return (this.state.sender_firstName.length > 0 && this.state.sender_lastName.length > 0 && this.state.sender_address.length > 0 && this.state.sender_city.length > 0 &&
          this.state.sender_state.length > 0 && this.state.sender_zip.length > 0 && this.state.sender_country.length > 0 && this.state.sender_email.length > 0 && this.state.sender_phone.length > 0);
      case 1:
        return (this.state.receiver_firstName.length > 0 && this.state.receiver_lastName.length > 0 && this.state.receiver_address.length > 0 && this.state.receiver_city.length > 0 &&
          this.state.receiver_state.length > 0 && this.state.receiver_zip.length > 0 && this.state.receiver_country.length > 0);
      case 2:
        return (this.state.package_type.length > 0 && this.state.package_weight.length > 0);
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
      <div className='send-package-page-bg'>
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
      </div>
    );
  }
}

SendPackage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SendPackage);