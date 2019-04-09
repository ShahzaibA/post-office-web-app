import React, { Component } from "react";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';


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
      <div class='container' flex style={{ margin: "0 auto", position: 'absolute', top: '65px', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Image src="boxes3.jpg" fluid style={{ margin: "0 auto", position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }} />
        <div flex style={{ position: "relative", padding: "20px", margin: "0 auto", width: "85%", top: '10%' }}>
          <h1 fluid style={{ color: "black", fontWeight: 700, fontSize: '3.5vw' }}>Tracking number</h1>
          <InputGroup className="mb-3" size="lg">
            <InputGroup.Prepend>
              <Button onClick={() => this.buttonConfirm()} href="/tracking" variant="danger" style={{ fontSize: '1.5vw', }}>Search</Button>
            </InputGroup.Prepend>
            <FormControl placeholder="Tracking ID"
              style={{ fontSize: '1.5vw' }}
              aria-label="Tracking ID"
              aria-describedby="basic-addon2"
              aria-describedby="basic-addon1" Input
              name="Tracking_ID"
              value={this.state.Tracking_ID}
              onChange={e => this.handleChange(e.target.name, e.target.value)} />
          </InputGroup>
        </div>
      </div >
    );
  }
}




