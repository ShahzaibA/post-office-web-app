import React, { Component } from 'react';
import UserInfo from './UserInfo';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  state = {};

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    fetch('http://localhost:4000/get_user')
      .then(res => res.json())
      .then(Response => this.setState({ states: Response.states }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        User Profile
        <UserInfo />


      </div >
    );
  }
}

export default UserProfile;
