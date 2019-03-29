import React, { Component } from 'react';
import './Tracking.css'
import NewTrackingRow from './NewTrackingRow.js';
import { Grid } from '@material-ui/core';


class Tracking extends Component {
    GenRows() {
        //Change numRows to the COUNT(*) of generated TrackingID's per account
        var numRows = 8;
        var rows = [];
        for (var i = 0; i < numRows; i++) {
            if (i % 2 == 0) {
                rows.push(<NewTrackingRow />)
            }
            else {
                rows.push(<NewTrackingRow />)
            }
        }
        return rows;
    }

    render() {
        return (
            <div class="TrackingWrapper">
                <div>
                    <h1>Tracking</h1>
                </div>
                <div>
                    <Grid>
                        {this.GenRows()}
                    </Grid>
                </div>
            </div>
        )
    }
}
export default Tracking;