import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Pages
import Home from './Pages/Home/Home';
import Tracking from './Pages/Tracking/Tracking2'
import SendPackage from './Pages/SendPackage/SendPackage'
import UserProfile from './Pages/UserProfile/UserProfile'

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
          <Route exact path='/user_profile' component={UserProfile} />

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
