// import 'bootstrap/dist/css/bootstrap.min.css';
// import InputGroup from 'react-bootstrap/InputGroup'
// import FormControl from 'react-bootstrap/FormControl'
// import Button from 'react-bootstrap/Button'
// import React, { Component } from 'react';
// import {
//   Carousel,
//   CarouselItem,
//   CarouselControl,
//   CarouselIndicators,
//   CarouselCaption
// } from 'reactstrap';

// const items = [
//   {
//     src: 'boxes.jpg',
//     altText: 'Slide 1',
//     caption: 'Slide 1'
//   },
//   {
//     src: 'boxes4.jpg',
//     altText: 'Slide 2',
//     caption: 'Slide 2'
//   },
//   {
//     src: 'boxes3.jpg',
//     altText: 'Slide 3',
//     caption: 'Slide 3'
//   }
// ];

// export default class Carousel1 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { activeIndex: 0 };
//     this.next = this.next.bind(this);
//     this.previous = this.previous.bind(this);
//     this.goToIndex = this.goToIndex.bind(this);
//     this.onExiting = this.onExiting.bind(this);
//     this.onExited = this.onExited.bind(this);
//   }

//   onExiting() {
//     this.animating = true;
//   }

//   onExited() {
//     this.animating = false;
//   }

//   next() {
//     if (this.animating) return;
//     const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
//     this.setState({ activeIndex: nextIndex });
//   }

//   previous() {
//     if (this.animating) return;
//     const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
//     this.setState({ activeIndex: nextIndex });
//   }

//   goToIndex(newIndex) {
//     if (this.animating) return;
//     this.setState({ activeIndex: newIndex });
//   }

//   render() {
//     const { activeIndex } = this.state;

//     const slides = items.map((item) => {
//       return (
//         <CarouselItem
//           onExiting={this.onExiting}
//           onExited={this.onExited}
//           key={item.src}
//         >
//           <img src={item.src} alt={item.altText} />
//           <CarouselCaption captionText={<InputGroup className="mb-3">
//             <InputGroup.Prepend>
//               <Button variant="danger">Search</Button>
//             </InputGroup.Prepend>
//             <FormControl aria-describedby="basic-addon1" />
//           </InputGroup>} captionHeader={'Search tracking number'} />
//         </CarouselItem>
//       );
//     });

//     return (
//       <Carousel
//         activeIndex={activeIndex}
//         next={this.next}
//         previous={this.previous}
//       >
//         <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
//         {slides}
//         <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
//         <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
//       </Carousel>

//     );
//   }
// }
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
    TrackingID: "1",

    data: [],
}
componentDidMount() {
  this.getShipStatus();
}
  getShipStatus() {
    fetch('http://localhost:4000/get_shipstatus', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            package_id: this.state.TrackingID
        })
    })
        .then(res => res.json())
        .then(result => this.setState({ data: result.data }))
        .catch(err => console.log(err))

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
                  <Button variant="danger">Search</Button>
                </InputGroup.Prepend>
                <FormControl aria-describedby="basic-addon1" />
              </InputGroup>
            </Carousel.Caption>
          </Carousel.Item>
          {/* <Carousel.Item>
            <img
              className="picture"
              src={"boxes3.jpg"}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Explore the Nights!</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item >
            <img
              className="picture"
              src={"boxes4.jpg"}
              alt="Third slide"

            />

            <Carousel.Caption>
              <h3 style={{ color: "#2A2A31" }}>Purchase your Tickets Today!</h3>
            </Carousel.Caption>
          </Carousel.Item> */}

        </Carousel>


      </div>
    );
  }
}




