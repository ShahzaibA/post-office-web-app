import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
                        id="packageType"
                        name="packageType"
                        value={props.val.packageType}
                        label="Packaging Type"
                        fullWidth
                        onChange={e => props.handleChange(e.target.name, e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="packageWeight"
                        name="packageWeight"
                        value={props.val.packageWeight}
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