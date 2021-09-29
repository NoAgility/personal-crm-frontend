import SpringBootAdapterWrapper from '../../util/SpringBootAdapterWrapper'
import { Redirect } from "react-router-dom";
import LoginController from "./LoginController"
const LoginControllerDefault = new Object(LoginController);

LoginControllerDefault.login = async (user) => {
	if (!user.username || !user.password) {
		throw new Error("Please provide an username and a password");
	}

	var data;
	var flag = await SpringBootAdapterWrapper.post(`/authenticate/login`, {}, {
		username: user.username,
		password: user.password
	}).then(response => {
		data = response.data
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