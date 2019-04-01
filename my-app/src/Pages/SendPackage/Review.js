import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

const styles = theme => ({
    listItem: {
        padding: `${theme.spacing.unit}px 0`,
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing.unit * 2,
    },
});

function calculatePrice(props) {
    if (props.val.package_type === "Letter") {
        const weight = parseFloat(props.val.package_weight);
        props.val.price = ((weight * .85 + 1.99) * 1.0825).toFixed(2)
        return ((weight * .85 + 1.99).toFixed(2))
    }

    else if (props.val.package_type === "Small Box") {
        const weight = parseFloat(props.val.package_weight);
        props.val.price = ((weight * .85 + 4.99) * 1.0825).toFixed(2)
        return ((weight * .85 + 4.99).toFixed(2))
    }

    else if (props.val.package_type === "Medium Box") {
        const weight = parseFloat(props.val.package_weight);
        props.val.price = ((weight * .85 + 9.99) * 1.0825).toFixed(2)
        return ((weight * .85 + 9.99).toFixed(2))
    }

    else if (props.val.package_type === "Large Box") {
        const weight = parseFloat(props.val.package_weight);
        props.val.price = ((weight * .85 + 14.99) * 1.0825).toFixed(2)
        return ((weight * .85 + 14.99).toFixed(2))
    }
}

function Review(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order Summary
      </Typography>
            <List disablePadding>
                <ListItem className={classes.listItem} key={props.val.package_type}>
                    <ListItemText primary={props.val.package_type} secondary={props.val.package_weight + "lbs"} />
                    <Typography variant="body2">${calculatePrice(props)}</Typography>
                </ListItem>
                <ListItem className={classes.listItem} key="tax">
                    <ListItemText primary="Tax" />
                    <Typography variant="subtitle1">${(calculatePrice(props) * .0825).toFixed(2)}</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        ${(calculatePrice(props) * 1.0825).toFixed(2)}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
          </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment details
          </Typography>
                    <Grid container>
                        {payments.map(payment => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

Review.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Review);