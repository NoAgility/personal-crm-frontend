import SpringBootAdapterWrapper from '../../util/SpringBootAdapterWrapper';
import { Redirect } from "react-router-dom";
import CookieManager from '../../util/CookieManager';
import LoginController from './LoginController';

/**
 * Test time implementation LoginController
 * During testing, a browser is mocked, so cookies need to be manually set to the document
 */
const LoginControllerETE = LoginController();

/**
 * Override: Logs the user in and sets cookie manually to the backend response
 * NOTE: Backend must use "ete" profile for this implementation to work
 * @param {*} user The user to login with
 * @returns A Redirect React Component
 */
LoginControllerETE.login = async (user) => {
	if (!user.username || !user.password) {
		throw new Error("Please provide an username and a password");
	}

	var flag = await SpringBootAdapterWrapper.post(`/authenticate/login`, {}, {
		username: user.username,
		password: user.password
	}).then(response => {
		CookieManager.setCookieRaw(response.data);
		return true;
	}).catch(err => { return false;});
  
	if (!flag) {
		throw new Error("Incorrect username and or password");
	} else {
		const state = { redirect: "/home" };
		return <Redirect to={state.redirect} />
	}
}

export default LoginControllerETE;