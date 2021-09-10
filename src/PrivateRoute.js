import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react'
import AuthService from './pages/AuthService';
const PrivateRoute = ({component : Component}) => {
    
    
    return (<Route render={props => AuthService.isLoggedIn ? <Component/> : <Redirect to={"/login"}/>}/>);
}

export default PrivateRoute;