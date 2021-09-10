import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react'
import AuthService from './pages/AuthService';
const PrivateRoute = ({path, component : Component}) => {
    
    const isLoggedIn = AuthService.isLoggedIn();
    return (<Route path={path}render={props => { return isLoggedIn ? <Component/> : <Redirect to={"/login"}/>}}/>);
}

export default PrivateRoute;