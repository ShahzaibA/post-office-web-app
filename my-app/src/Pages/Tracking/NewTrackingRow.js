import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class NewTrackingRow extends Component {
    render() {
        return (
            <Grid item align-items='center' xs={6} style={{ background: '#e3e3e3' }}>
                <Paper class="image">
                    <h1>Row</h1>
                    <p>New row instance.</p>
                </Paper>
            </Grid>
        )
    }
}
export default NewTrackingRow;