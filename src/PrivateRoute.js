import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react'

const PrivateRoute = ({component : Component}) => {
    
    const isLoggedIn = true;
    return (<Route render={props => isLoggedIn ? <Component/> : <Redirect to={"/login"}/>}/>);
}

export default PrivateRoute;