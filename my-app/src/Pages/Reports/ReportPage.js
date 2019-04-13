import React, { Component, Fragment } from 'react';
import DatePickers from './Components/DatePickers'
import SimpleSelect from './Components/SimpleSelect'
import SimpleTable from './Components/SimpleTable'
import ContainedButtons from './Components/ContainedButtons'
import { Paper, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';



class ReportPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status_type: null,
            date1: null,
            date2: null,
            results: [],
        };
        this.handleDate1 = this.handleDate1.bind(this)
        this.handleDate2 = this.handleDate2.bind(this)
        this.handleStatus = this.handleStatus.bind(this)
        this.handleButton = this.handleButton.bind(this)
    }

    handleDate1(e) {
        this.setState({ date1: e.target.value })
    }
    handleDate2(e) {
        this.setState({ date2: e.target.value })
    }
    handleStatus(e) {
        this.setState({ status_type: e.target.value })
    }
    handleButton(e) {
        if (this.state.status_type !== null && this.state.date1 !== null && this.state.date2 !== null) {

            var url = new URL("http://localhost:4000/get_report"),
                params = {
                    status_type: this.state.status_type,
                    date1: this.state.date1,
                    date2: this.state.date2,
                }
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            fetch(url)
                .then(res => res.json())
                .then(res => this.setState({ results: res }))

        }
    }


    render() {
        return (
            <Fragment>
                <div class="container" style={{ paddingTop: "40px" }}>
                    <Paper>
                        <h1 style={{ padding: "20px" }}>Reports</h1>
                        <Grid style={{ padding: "20px" }}>
                            <DatePickers
                                name="Begin Date"
                                onChange={this.handleDate1}
                            />
                            <DatePickers
                                name="End Date"
                                onChange={this.handleDate2}
                            />
                            <SimpleSelect
                                handleStatus={this.handleStatus}
                            />
                            <ContainedButtons
                                onClick={this.handleButton}
                            />
                            <SimpleTable
                                results={this.state.results}
                            />
                        </Grid>
                    </Paper>
                </div>
            </Fragment>
        )
    }
}
export default ReportPage;