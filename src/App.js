import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState } from "react";
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Settings from './components/settings/Settings';
import Login from './pages/Login';
import Registration from './components/registration/Registration';
import RegistrationSuccess from './components/registration/RegistrationSuccess';
import axios from 'axios';
import Calendar from './components/calendar/Calendar';
import PrivateRoute from './PrivateRoute';
function App() {
  axios.defaults.adapter = require('axios/lib/adapters/http');

  return (
    <Router>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component = {Registration}/>
      <Route exact path="/registration_success" component={RegistrationSuccess}/>
      <PrivateRoute path="/home" component={() => { return (<div><Header/><Navbar/></div>);}}/>  
      <div className="app-body">
        <PrivateRoute path="/home" component={Calendar}/>
      </div>
    </Router>
  );
}

export default App;
