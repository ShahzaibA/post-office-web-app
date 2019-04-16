import React, { Component, Fragment } from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MarkunreadMailbox, Commute, SentimentSatisfied} from '@material-ui/icons';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export default class HomeCarousel extends Component {
  state = {
    Tracking_ID: "",
    ExtraRow: false,
  }

  buttonConfirm() {
    localStorage.setItem('Tracking_ID', this.state.Tracking_ID);
  }

  handleChange = (name, val) => {
    this.setState({ [name]: val });
  }

  render() {
    return (
        <Fragment>
        <div className='home-page-bg'>
          <div class='container' style={{ padding: "5vw", paddingTop: "170px", margin: "0 auto" }}>
            <div flex style={{ position: "relative", padding: "20px", margin: "0 auto", width: "85%", top: '10%' }}>
              
              <h1 fluid style={{ color: "black", fontWeight: 700, fontSize: '3.5vw' }}>Track my Package!</h1>
              
              <InputGroup className="mb-3" size="lg">
                <FormControl placeholder="Tracking ID"
                  style={{ fontSize: '1.5vw' }}
                  aria-label="Tracking ID"
                  aria-describedby="basic-addon2"
                  aria-describedby="basic-addon1" Input
                  name="Tracking_ID"
                  value={this.state.Tracking_ID}
                  onChange={e => this.handleChange(e.target.name, e.target.value)} />
                <InputGroup.Prepend>
                  <Button onClick={() => this.buttonConfirm()} href="/tracking" variant="danger" style={{ fontSize: '1.5vw', }}>Search</Button>
                </InputGroup.Prepend>
              </InputGroup>
            </div>
          </div >
        </div>
        {this.state.ExtraRow ? (<div class = "override">
          <h1 style = {{fontSize: '3em'}}>HOW DO I SHIPIT?</h1>
          <Grid container spacing={24} justify="center" style = {{width: '100%', alignContent: 'center', textAlign: 'center', padding: '40px'}}>
              <Grid item xs={3}>
                  <a href="/send_package" style = {{fontSize: '1em'}}><Link to="/send_package">Send Us A Package</Link></a>
                  <Grid style = {{padding: '10px'}}>
                      <MarkunreadMailbox style = {{fontSize: '3.4em'}}></MarkunreadMailbox>
                  </Grid>
              </Grid>
              <Typography
                type="title"
                color="#c6c6c6"
                style={{ borderRight: '0.1em solid #c6c6c6', padding: '0.5em', marginRight: '1em'  }}
                ></Typography>
            <Grid item xs={3}>
                  <a href="/" onClick={() => window.location.replace('/')} style = {{fontSize: '1em'}}><Link to="/">Track Your Package</Link></a>
                  <Grid style = {{padding: '10px'}}>
                      <Commute style = {{fontSize: '4em'}}></Commute>
                  </Grid>
            </Grid>
              <Typography
                type="title"
                color="#c6c6c6"
                style={{ borderRight: '0.05em solid #c6c6c6', padding: '0.5em', marginRight: '1em' }}
                ></Typography>
            <Grid item xs={3}>
                <a href ="" style = {{fontSize: '1em'}}>Receieve Package</a>
                <Grid style = {{padding: '10px'}}>
                      <SentimentSatisfied style = {{fontSize: '4em'}}></SentimentSatisfied>
                </Grid>
            </Grid>
          </Grid>
        </div>) : (<Fragment></Fragment>)}
      </Fragment>
    );
  }
}




