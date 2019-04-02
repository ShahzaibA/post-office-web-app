import React, { Component } from 'react';
import UserInfo from './UserInfo';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      firstname: null,
      lastname: null,
      address1: null,
      address2: null,
      zip: null,
      email: null,
      phone: null,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {

    var url = new URL("http://localhost:4000/get_user"),
    params = {email: 'honey@gmail.com'}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url)
      .then(res => res.json())
      //.then(res => console.log('respond from backend:',res))
      .then(res => this.setState(res))
      .catch(err => console.log(err))
  }

  render() {
    console.log('render state:',this.state)
    return (
      <div>
        <UserInfo 
          email={this.state.email}
          username={this.state.username}
          firstname={this.state.firstname}
          lastname={this.state.lastname}
          address1={this.state.address1}
          address2={this.state.address2}
          zip={this.state.zip}
          phone={this.state.phone}
        />
      </div >
    );
  }
}

export default UserProfile;
