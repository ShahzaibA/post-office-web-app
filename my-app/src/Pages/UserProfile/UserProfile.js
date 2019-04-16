import React, { Component } from 'react';
import UserInfo from './UserInfo';
import UserEdit from './UserEdit';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

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


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender_firstName: "",
      sender_lastName: "",
      sender_address: "",
      sender_address2: "",
      sender_apartment: "",
      sender_city: "",
      sender_state: "",
      sender_zip: "",
      sender_country: "",
      sender_email: "",
      sender_phone: "",
      states: [],
      cities: [],
      countries: [],
      username: "",
      password: "",
      edit: false,
      open: false,
      new_password: '',
    };

    // This binding is necessary to make `this` work in the callback
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  componentDidMount() {

    this.getUserInfo();


  }

  getUserInfo() {
    let tempState = {}


    var url = new URL("http://68.183.131.116:4000/get_user"),
      params = { sender_ID: localStorage.getItem('sender_ID') }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url)
      .then(res => res.json())
      .then(res => Object.assign(tempState, res))
      .then(() => {
        fetch('http://68.183.131.116:4000/get_states')
          .then(res => res.json())
          .then(res => Object.assign(tempState, res))
          .then(() => {
            fetch('http://68.183.131.116:4000/get_cities')
              .then(res => res.json())
              .then(res => Object.assign(tempState, res))
              .then(() => {
                fetch('http://68.183.131.116:4000/get_countries')
                  .then(res => res.json())
                  .then(res => Object.assign(tempState, res))
                  .then(() => {
                    tempState.sender_state = tempState.states[tempState.sender_state - 1].State_Abbr;
                    tempState.sender_city = tempState.cities[tempState.sender_city - 1].City_Name;
                    tempState.sender_country = tempState.countries[tempState.sender_country - 1].Country_Name;

                    // cleanup nulls from backend
                    Object.keys(tempState).map(function (key, index) {
                      if (tempState[key] === null || tempState[key] === 'null') {
                        tempState[key] = '';
                      }
                    })

                    this.setState(tempState);
                  })
                  .catch(err => console.log(err))
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  updatePassword = () => {
    fetch('http://68.183.131.116:4000/update_user_password', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Sender_ID: localStorage.getItem('sender_ID'),
        New_Password: this.state.new_password,
      })
    })
      .then(this.handleClose)
      .catch(err => console.log(err))
  }

  changePassword() {
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
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  id="new_password"
                  label="Enter a new password"
                  name="new_password"
                  type="new_password"
                  fullWidth
                  onChange={e => this.handleChange(e.target.name, e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              color="secondary"
              onClick={this.updatePassword}>
              Change Password
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    )
  }


  AccountEdit() {
    let tempState = {};
    Object.assign(tempState, this.state);

    if (this.state.edit === false)
      return (
        <div>
          <UserInfo val={this.state} />
          <Button variant="contained" color="secondary" onClick={this.handleEditClick}>
            Edit
          </Button>
          <Button variant="contained" color="danger" onClick={this.handleClickOpen}>
            Change Password
          </Button>
        </div>
      )
    else
      return (
        <div>
          <UserEdit handleChange={this.handleChange} val={tempState} />
          <Button variant="contained" color="primary" href="/user_profile">
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={this.handleSubmitClick}>
            Submit
          </Button>

        </div>


      )
  }

  handleChange = (name, val) => {
    this.setState({ [name]: val });
  };

  handleEditClick() {
    this.setState(Object.assign(this.state, { edit: true }))
  }

  handleSubmitClick() {
    /*     { username, password, sender_firstName, sender_lastName, sender_address, sender_apartment, sender_city, sender_state,
          sender_zip, sender_country, sender_email, sender_phone, sender_id } */

    fetch('http://68.183.131.116:4000/edit_user', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        sender_firstName: this.state.sender_firstName,
        sender_lastName: this.state.sender_lastName,
        sender_address: this.state.sender_address,
        sender_address2: this.state.sender_address2,
        sender_apartment: this.state.sender_apartment,
        sender_city: this.state.sender_city,
        sender_state: this.state.sender_state,
        sender_zip: this.state.sender_zip,
        sender_country: this.state.sender_country,
        sender_email: this.state.sender_email,
        sender_phone: this.state.sender_phone,
        sender_id: localStorage.getItem('sender_ID'),
      })
    })
      .catch(err => console.log(err))

    this.setState(Object.assign(this.state, { edit: false }))
  }


  render() {
    const { classes } = this.props;
    console.log(this.state.new_password);
    return (

      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Account Info
        </Typography>
            {this.AccountEdit()}
            {this.changePassword()}
          </Paper>
        </main>
      </React.Fragment>














    );
  }
}

export default withStyles(styles)(UserProfile);
