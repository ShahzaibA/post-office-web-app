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
    Button: {
        marginTop: theme.spacing.unit * 10,
        marginLeft: theme.spacing.unit * 80,
    }
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
                    Username: {props.val.username}
                </Typography>
                <Typography component="p">
                    Email: {props.val.sender_email}
                </Typography>
                <Typography component="p">
                    First Name: {props.val.sender_firstName}
                </Typography>
                <Typography component="p">
                    Last Name: {props.val.sender_lastName}
                </Typography>
                <Typography component="p">
                    Address: {props.val.sender_address}
                </Typography>
                <Typography component="p">
                    Address2: {props.val.sender_address2}
                </Typography>
                <Typography component="p">
                    ZIP: {props.val.sender_zip}
                </Typography>
                <Typography component="p">
                Phone: {props.val.sender_phone}
                </Typography>
                <Typography component="p">
                Apartment: {props.val.sender_apartment}
                </Typography>
                <Typography component="p">
                City: {props.val.sender_city}
                </Typography>
                <Typography component="p">
                State: {props.val.sender_state}
                </Typography>
                <Typography component="p">
                Country: {props.val.sender_country}
                </Typography>
            </Paper>
        </div>
    );
}

UserInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);
