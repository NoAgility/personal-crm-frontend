import './App.css';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import React from "react";
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Calendar from './components/calendar/Calendar';
import Registration from './components/registration/Registration';
import RegistrationSuccess from './components/registration/RegistrationSuccess';
import axios from 'axios';
import PrivateRoute from './util/PrivateRoute';
import AuthService from './util/AuthService';
function App() {
  axios.defaults.adapter = require('axios/lib/adapters/http');

  return (
    <Router>
      <Switch>
        
        <Route path="/home" component={() => { return (<React.Fragment><Header/><Navbar/><div className="app-body"><Calendar/></div></React.Fragment>);}}/>  
      </Switch>
    </Router>
  );
}

export default App;
