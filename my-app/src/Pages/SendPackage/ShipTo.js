import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function ShipTo() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Reciever's Information
      </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="receiver_firstName"
                        name="receiver_firstName"
                        label="First name"
                        fullWidth
                        autoComplete="fname"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="receiver_lastName"
                        name="receiver_lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="lname"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="receiver_address"
                        name="reciever_address"
                        label="Address line"
                        fullWidth
                        autoComplete="address-line"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="receiver_apartment"
                        name="receiver_apartment"
                        label="Apartment, suite, unit, building, floor, etc."
                        fullWidth
                        autoComplete="apartment"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="receiver_city"
                        name="reciever_city"
                        label="City"
                        fullWidth
                        autoComplete="address-level2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="receiever_state"
                        name="receiver_state"
                        label="State/Province/Region"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="receiver_zip"
                        name="receiver_zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="receiver_country"
                        name="receiver_country"
                        label="Country"
                        fullWidth
                        autoComplete="country"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ShipTo;