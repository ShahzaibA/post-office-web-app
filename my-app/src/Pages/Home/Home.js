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
      <div>
        <Image src="boxes3.jpg" fluid />
        <div style={{ position: "relative", bottom: 400, width: 700, margin: "0 auto" }}>
          <h1 style={{ color: "black" , fontWeight:700 , fontSize:80 }}>Tracking number</h1>
          <InputGroup className="mb-3" size = "lg">
            <InputGroup.Prepend>
              <Button onClick={() => this.buttonConfirm()} href="/tracking" variant="danger">Search</Button>
            </InputGroup.Prepend>
            <FormControl placeholder="Tracking ID"
              aria-label="Tracking ID"
              aria-describedby="basic-addon2"
               aria-describedby="basic-addon1" Input
              name="Tracking_ID"
              value={this.state.Tracking_ID}
              onChange={e => this.handleChange(e.target.name, e.target.value)} />
          </InputGroup>
        </div>


      </div>
    );
  }
}




