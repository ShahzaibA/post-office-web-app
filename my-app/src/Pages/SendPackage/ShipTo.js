import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const countries = [
    { country_name: "United States" },
]

function ShipTo(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Receiver's Information
      </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="receiver_firstName"
                        name="receiver_firstName"
                        value={props.val.receiver_firstName}
                        label="First name"
                        inputProps={{
                            maxLength: 18,
                        }}
                        fullWidth
                        autoComplete="fname"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="receiver_lastName"
                        name="receiver_lastName"
                        value={props.val.receiver_lastName}
                        label="Last name"
                        inputProps={{
                            maxLength: 18,
                        }}
                        fullWidth
                        autoComplete="lname"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="receiver_address"
                        name="receiver_address"
                        value={props.val.receiver_address}
                        label="Address line"
                        inputProps={{
                            maxLength: 32,
                        }}
                        fullWidth
                        autoComplete="address-line"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="receiver_apartment"
                        name="receiver_apartment"
                        type="number"
                        value={props.val.receiver_apartment}
                        label="Apartment, suite, unit, building, floor, etc."
                        inputProps={{
                            maxLength: 11,
                        }}
                        fullWidth
                        autoComplete="apartment"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="receiver_city"
                        name="receiver_city"
                        value={props.val.receiver_city}
                        label="City"
                        inputProps={{
                            maxLength: 24,
                        }}
                        fullWidth
                        autoComplete="address-level2"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="receiever_state"
                        select
                        variant="standard"
                        name="receiver_state"
                        value={props.val.receiver_state}
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
                        id="receiver_zip"
                        name="receiver_zip"
                        type="number"
                        value={props.val.receiver_zip}
                        label="Zip / Postal code"
                        inputProps={{
                            maxLength: 5,
                        }}
                        fullWidth
                        autoComplete="postal-code"
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="receiver_country"
                        select
                        variant="standard"
                        name="receiver_country"
                        value={props.val.receiver_country}
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
            </Grid>
        </React.Fragment>
    );
}

export default ShipTo;