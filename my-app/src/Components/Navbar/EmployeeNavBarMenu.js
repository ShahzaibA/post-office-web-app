import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

// {this.state.employee_email !== null ? (
//   <li><a href="/arrival_scan"><Link to="/arrival_scan">Arrival Scan</Link></a></li>
// ) : (
//       <div></div>
//   )}
class EmployeeNavBarMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Employee
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}><a href="/arrival_scan"><Link to="/arrival_scan">Arrival Scan</Link></a></MenuItem>
          <MenuItem onClick={this.handleClose}><a href="/route_packages"><Link to="/route_packages">Route Packages</Link></a></MenuItem>
          <MenuItem onClick={this.handleClose}><a href="/assign_delivery"><Link to="/assign_delivery">Assign Delivery</Link></a></MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default EmployeeNavBarMenu;