import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

function UserInfo(props) {
    const { classes } = props;

    return (
        <div>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    User Profile
                </Typography>
                
                <Typography component="p">
                    Username: {props.username}
                </Typography>
                <Typography component="p">
                    Email: {props.email}
                </Typography>
                <Typography component="p">
                    First Name: {props.firstname}
                </Typography>
                <Typography component="p">
                    Last Name: {props.lastname}
                </Typography>
                <Typography component="p">
                    Address: {props.address1}
                </Typography>
                <Typography component="p">
                    {props.address2}
                </Typography>
                <Typography component="p">
                    ZIP: {props.zip}
                </Typography>
                <Typography component="p">
                Phone: {props.phone}
                </Typography>
            </Paper>
        </div>
    );
}

UserInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);
