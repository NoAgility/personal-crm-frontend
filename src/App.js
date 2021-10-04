import './App.css';
import {
	BrowserRouter as Router,
	Redirect,
	Switch,
	Route
} from 'react-router-dom';
import React from "react";
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import RegistrationSuccess from './components/registration/RegistrationSuccess';
import axios from 'axios';
import PrivateRoute from './util/PrivateRoute';
import AuthService from './util/AuthService';
import Dashboard from './Dashboard';

function App() {
	axios.defaults.adapter = require('axios/lib/adapters/http');

	return ( <Router>
				<Switch>
					<Redirect 
						exact from="/"
						to="/login"
					/> 
					{ AuthService.isLoggedIn() ? 
						<Redirect 
							exact from = "/login"
							to = "/home"
							/> : "" } 
					<Route 
						exact path = "/login"
						component = {Login}
					/> 
					<Route 
						exact path = "/register"
						component = {Registration}
					/> 
					<Route 
						exact path = "/registration_success"
						component = {RegistrationSuccess}
					/> 
					<PrivateRoute 
						path = "/home"
						component = {
							() => {
							return (<React.Fragment>
								<Header/>
								<Navbar/>
								<div className="app-body scroll-container">
									<Dashboard/>
								</div> 
								</React.Fragment>);
							}
						}
					/>
				</Switch> 
			</Router>
		);
	}

export default App;