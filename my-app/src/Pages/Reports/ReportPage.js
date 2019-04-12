import React, { Component, Fragment } from 'react';
import DatePickers from './Components/DatePickers'
import SimpleSelect from './Components/SimpleSelect'
import SimpleTable from './Components/SimpleTable'
import ContainedButtons from './Components/ContainedButtons'



class ReportPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hub_Name: "",
      };
    }

    render() {
        return(
            <Fragment>
                <DatePickers name="Begin Date"></DatePickers>
                <DatePickers name="End Date"></DatePickers>
                <SimpleSelect></SimpleSelect>
                <ContainedButtons></ContainedButtons>
                <SimpleTable></SimpleTable>

            </Fragment>
        )
    }
}
export default ReportPage;