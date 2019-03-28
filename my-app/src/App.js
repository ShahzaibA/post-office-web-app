import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Pages
import Home from './Pages/Home/Home';
import Tracking from './Pages/Tracking/Tracking'
import SendPackage from './Pages/SendPackage/SendPackage'

//Components
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Navbar />

          <Route exact path='/' component={Home} />
          <Route exact path='/tracking' component={Tracking} />
          <Route exact path='/send_package' component={SendPackage} />

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
