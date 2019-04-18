import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTableDriver(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Driver ID</TableCell>
            <TableCell>Hub ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Number Of Packages Delivered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.results.map(row => (
            <TableRow>
              <TableCell>{row.Driver_ID}</TableCell>
              <TableCell>{row.Hub_ID}</TableCell>
              <TableCell>{row.FName}</TableCell>
              <TableCell>{row.LName}</TableCell>
              <TableCell>{row.Email}</TableCell>
              <TableCell>{row.Num_Package}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTableDriver.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTableDriver);
