import React, { Component } from 'react';
import './Tracking.css'

class Tracking extends Component {
    numState = {
        numRows: 5
    }

    render() {
        return (
            <div>
                <h1>Tracking Page</h1>
                <p>We are currently at the tracking.</p>
            </div>
        )
    }
}
export default Tracking;