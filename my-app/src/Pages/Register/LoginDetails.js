import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default class LoginDetails extends Component {
    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Username/Password
                </Typography>
                <TextField
                    required
                    id="username"
                    name="username"
                    label="Username"
                    value={this.props.val.username}
                    onChange={e => this.props.handleChange(e.target.name, e.target.value)}
                    style={{ width: "35%", paddingBottom: "8px" }}
                    margin="dense"
                />
                <br />
                <TextField
                    required
                    id="password"
                    name="password"
                    value={this.props.val.password}
                    onChange={e => this.props.handleChange(e.target.name, e.target.value)}
                    label="Password"
                    style={{ width: "35%", paddingBottom: "30px" }}
                    type="password"
                    margin="dense"
                />
            </React.Fragment>
        );
    }
}