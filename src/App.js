import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from "react";
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Login from './pages/Login';
import Registration from './components/registration/Registration';
import RegistrationSuccess from './components/registration/RegistrationSuccess';
import axios from 'axios';
function App() {
  axios.defaults.adapter = require('axios/lib/adapters/http');
  return (
    <div className="App">

      <Header />
      <Navbar />
      <div className="app-body">
      </div>

    </div>
  );
}

export default App;
