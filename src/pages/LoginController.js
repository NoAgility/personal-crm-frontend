import { fetch, post } from '../SpringBootAdapter.js'
import AuthService from './AuthService.js'
import { Redirect } from "react-router-dom";

const LoginController = {
	Login : async (user) => {
		try{
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
			}).catch(err => {return false;});

			if (!flag) {
				throw new Error("Incorrect username and or password");
			} else {
				AuthService.setCookie("jwt", data.token, data.expDate);
				const state = { redirect: "/" };
      			return <Redirect to={state.redirect} />
			}
		} catch (err) {
			return err;
		}
	}
}

export default LoginController;