import SpringBootAdapterWrapper from '../../util/SpringBootAdapterWrapper';
import { Redirect } from "react-router-dom";
import CookieManager from '../../util/CookieManager';
import LoginController from './LoginController';
const LoginControllerETE = new Object(LoginController);
LoginControllerETE.login = async (user) => {
	if (!user.username || !user.password) {
		throw new Error("Please provide an username and a password");
	}

	var data;
		var flag = await SpringBootAdapterWrapper.post(`/authenticate/login_ete`, {}, {
			username: user.username,
			password: user.password
		}).then(response => {
			CookieManager.setCookie(response.data.name, response.data.value, response.data.maxAge);
			return true;
		}).catch(err => { return false;});
	if (!flag) {
		throw new Error("Incorrect username and or password");
	} else {
		const state = { redirect: "/home" };
		return <Redirect to={state.redirect} />
	}

	const state = { redirect: "/home" };
	return <Redirect to={state.redirect} />
}

export default LoginControllerETE;