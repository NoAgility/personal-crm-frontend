import './App.css';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
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
import AuthService from './pages/AuthService';
function App() {
  axios.defaults.adapter = require('axios/lib/adapters/http');

  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login"/>
        {AuthService.isLoggedIn() ? <Redirect exact from="/login" to="home"/> : ""}
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component = {Registration}/>
        <Route exact path="/registration_success" component={RegistrationSuccess}/>
        <PrivateRoute path="/home" component={() => { return (<div><Header/><Navbar/></div>);}}/>  
      </Switch>
    </Router>
  );
}

export default App;
