import React, { Component, Fragment } from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MarkunreadMailbox, } from '@material-ui/icons';

export default class HomeCarousel extends Component {
  state = {
    Tracking_ID: "",
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
        <div class = "container" style = {{width: '100%', alignContent: 'center', textAlign: 'center', paddingTop: '50px', paddingBottom: '50px'}}>
          <h1 style = {{fontSize: '3em'}}>HOW DO I SHIPIT?</h1>
          <Grid container spacing={24} justify="center" style = {{width: '100%', alignContent: 'center', textAlign: 'center', padding: '30px'}}>
              <Grid item xs={3}>
                  Send us a package 
                  <Grid>
                  <MarkunreadMailbox></MarkunreadMailbox>
                  </Grid>
              </Grid>
              <Typography
                type="title"
                color="inherit"
                style={{ borderRight: '0.1em solid black', padding: '0.5em' }}
                ></Typography>
            <Grid item xs={3}>
                Track your package
            </Grid>
              <Typography
                type="title"
                color="inherit"
                style={{ borderRight: '0.1em solid black', padding: '0.5em' }}
                ></Typography>
            <Grid item xs={3}>
                Receieve your package
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}




