import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


function PackageInformation(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Package Information
      </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="package_type"
                        select
                        variant="standard"
                        name="package_type"
                        value={props.val.package_type}
                        label="Packaging Type"
                        fullWidth
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    >
                        {props.val.package_types.map(option => (
                            <MenuItem key={option.ShipForm} value={option.ShipForm}>
                                {option.ShipForm}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="package_weight"
                        name="package_weight"
                        value={props.val.package_weight}
                        label="Weight (in lbs)"
                        fullWidth
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default PackageInformation;