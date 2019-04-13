import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Pages
import Home from './Pages/Home/Home';
import Tracking from './Pages/Tracking/Tracking2';
import Invoice from './Pages/Invoice/Invoice';
import SendPackage from './Pages/SendPackage/SendPackage';
import UserProfile from './Pages/UserProfile/UserProfile';
import Login from './Pages/Login/Login';
import Registration from './Pages/Register/Register';
import EmployeeLogin from './Pages/Login/EmployeeLogin';
import ArrivalScan from './Pages/ArrivalScan/ArrivalScan';
import RoutePackage from './Pages/RoutePackage/RoutePackage';
import AssignDelivery from './Pages/AssignDelivery/AssignDelivery';
import Delivered from './Pages/Delivered/Delivered';
import ManageEmployees from './Pages/ManageEmployees/ManageEmployees';
import Reports from './Pages/Reports/ReportPage';


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
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Registration} />
          <Route exact path='/employee_login' component={EmployeeLogin} />
          <Route exact path='/arrival_scan' component={ArrivalScan} />
          <Route exact path='/invoice' component={Invoice} />
          <Route exact path='/route_packages' component={RoutePackage} />
          <Route exact path='/assign_delivery' component={AssignDelivery} />
          <Route exact path='/deliveries' component={Delivered} />
          <Route exact path='/manage_employees' component={ManageEmployees} />
          <Route exact path='/reports' component={Reports} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
