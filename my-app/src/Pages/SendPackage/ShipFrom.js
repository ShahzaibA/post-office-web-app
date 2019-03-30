import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const countries = [
    { country_name: "United States" },
]

function ShipFrom(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipper's Information
      </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="sender_firstName"
                        name="sender_firstName"
                        value={props.val.sender_firstName}
                        label="First name"
                        fullWidth
                        autoComplete="fname"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="sender_lastName"
                        name="sender_lastName"
                        value={props.val.sender_lastName}
                        label="Last name"
                        fullWidth
                        autoComplete="lname"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="sender_address"
                        name="sender_address"
                        value={props.val.sender_address}
                        label="Address line 1"
                        fullWidth
                        autoComplete="address-line"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="sender_apartment"
                        name="sender_apartment"
                        value={props.val.sender_apartment}
                        label="Apartment, suite, unit, building, floor, etc."
                        fullWidth
                        autoComplete="apartment"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="sender_city"
                        name="sender_city"
                        value={props.val.sender_city}
                        label="City"
                        fullWidth
                        autoComplete="address-level2"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="sender_state"
                        select
                        variant="standard"
                        name="sender_state"
                        value={props.val.sender_state}
                        label="State/Province/Region"
                        fullWidth
                        onChange={e => props.handleChange(e.target.name, e.target.value)}

                    >
                        {props.val.states.map(option => (
                            <MenuItem key={option.State_Abbr} value={option.State_Abbr}>
                                {option.State_Abbr}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="sender_zip"
                        name="sender_zip"
                        value={props.val.sender_zip}
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="postal-code"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="sender_country"
                        select
                        variant="standard"
                        name="sender_country"
                        value={props.val.sender_country}
                        label="Country"
                        fullWidth
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    >
                        {countries.map(option => (
                            <MenuItem key={option.country_name} value={option.country_name}>
                                {option.country_name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="sender_email"
                        name="sender_email"
                        value={props.val.sender_email}
                        label="Email"
                        fullWidth
                        autoComplete="email"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="sender_phone"
                        name="sender_phone"
                        value={props.val.sender_phone}
                        label="Phone"
                        fullWidth
                        autoComplete="phone"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ShipFrom;