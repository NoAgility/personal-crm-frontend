import SpringBootAdapterWrapper from '../../util/SpringBootAdapterWrapper'
import { Redirect } from "react-router-dom";
import LoginController from "./LoginController"
import React from 'react';


/**
 * Real time application implementation of Login Controller, assumes use of a browser
 * Set-Cookie is automatically handled.
 */
const LoginControllerDefault = LoginController();


/**
 * Override: Allows the user to login, cookie is automatically passed
 * @param {*} user The user details to login with
 * @returns A Redirect React Component to the home page
 */
LoginControllerDefault.login = async (user) => {
	if (!user.username || !user.password) {
		throw new Error("Please provide an username and a password");
	}

	var data;
	var flag = await SpringBootAdapterWrapper.post(`/authenticate/login`, {}, {
		username: user.username,
		password: user.password
	}).then(response => {
		return true;
	}).catch(err => {; return false;});

	if (!flag) {
		throw new Error("Incorrect username and or password");
	} else {
		const state = { redirect: "/home" };
		return <Redirect to={state.redirect} />
	}
}
export default LoginControllerDefault;