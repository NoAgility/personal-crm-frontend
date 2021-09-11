import { fetch, post } from '../SpringBootAdapter.js'
import AuthService from './AuthService.js'
import { Redirect } from "react-router-dom";

const LoginController = {
	Login : async (user) => {
		if (!user.username || !user.password) {
			throw new Error("Please provide an username and a password");
		}

		var data;
		var flag = await post(`/authenticate/login`, {}, {
			username: user.username,
			password: user.password
		}).then(response => {
			data = response.data
			return true;
		}).catch(err => {; return false;});

		if (!flag) {
			throw new Error("Incorrect username and or password");
		} else {
			AuthService.setCookie("jwt", data.token, data.expDate);
			AuthService.username = user.username;

			await fetch(`/account/get?username=${user.username}`, {}, {})
			.then(response => {
				data = response.data
				return true;
			}).catch(err => {return false;});

			AuthService.userId = data.id;
			const state = { redirect: "/home" };
			return <Redirect to={state.redirect} />
		}
	}
}

export default LoginController;