import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import React from "react";
function App() {
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
