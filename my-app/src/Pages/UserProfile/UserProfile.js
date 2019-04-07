import React, { Component } from 'react';
import UserInfo from './UserInfo';
import UserEdit from './UserEdit';
import Button from '@material-ui/core/Button';





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
      username: "",
      edit: false,
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  getStates() {
    fetch('http://localhost:4000/get_states'
    )
      .then(res => res.json())
      .then(Response => {
        this.setState(Object.assign(this.state, Response))
        /* console.log(this.state.states);
        console.log(this.state.sender_state);
        console.log(this.state.states[this.state.sender_state].State_Abbr); */

        this.setState(Object.assign(this.state, {sender_state: this.state.states[this.state.sender_state - 1].State_Abbr}))
      })
      .catch(err => console.log(err))
  }

  AccountEdit() {
    if (this.state.edit === false)
      return (
        <div>
          <UserInfo val={this.state} />
          <Button variant="contained" color="secondary" onClick={this.handleClick}>
            Click to Edit
          </Button>
        </div>
      )
    else
      return (
        <UserEdit val={this.state} />
        
      )
  }
  handleClick() {
    this.setState(Object.assign(this.state, {edit: true}))
  }

  componentDidMount() {
    this.getUserInfo();
    this.getStates();
  }

  getUserInfo() {

    var url = new URL("http://localhost:4000/get_user"),
      params = { sender_ID: localStorage.getItem('sender_ID') }//tSender_ID
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url)
      .then(res => res.json())
      //.then(res => console.log('respond from backend:',res))
      .then(res => this.setState(Object.assign(this.state, res)))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        {this.AccountEdit()}
      </div >
    );
  }
}

export default UserProfile;
