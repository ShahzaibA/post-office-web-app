import React, { Component } from "react";
import { Carousel } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = theme => ({
  overrider: {
    margin: "5px",
  },
  wrapper: {
    width: "70%",
    margin: "0 auto",
    padding: "70px 0 0 0"
  },
  root: {
    align: "center",
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    padding: 10,
  },
  table: {
    minWidth: 700,
  },
});

export default class HomeCarousel extends Component {
  state = {
    Tracking_ID: "",
  }

  buttonConfirm() {
    localStorage.setItem('Tracking_ID', 1);
  }

  handleChange = (name, val) => {
    this.setState({ [name]: val });
}

  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="picture"
              src={"boxes4.jpg"}
              alt="First slide"
            />
            <Carousel.Caption>
              <h1>Tracking number</h1>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <Button onClick={this.buttonConfirm} variant="danger">Search</Button>
                    <input Input
                    Tracking_ID="T_ID"
                    onChange={e => this.handleChange(e.target.name, e.target.value)}/>
                </InputGroup.Prepend>
              </InputGroup>
            </Carousel.Caption>
          </Carousel.Item>

        </Carousel>


      </div>
        );
      }
    }
    
    
    
    
