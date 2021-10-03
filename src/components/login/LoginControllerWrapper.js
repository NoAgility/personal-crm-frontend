import LoginController from './LoginController';

/**
 * LoginController wrapper singleton
 * By default uses the abstract LoginController objects
 * Can be set at runtime to use concretions
 */
const LoginControllerWrapper = {
	loginController: LoginController(),
	loginControllerIsSet: false,

	/**
	 * Wrapper function to log the user in
	 * @param {*} user The user to log in
	 * @returns A React Redirect Component
	 */
	Login(user) {
		return this.loginControllerIsSet && this.loginController.login(user);
	},
	/**
	 * Wrapper function to inject the implementation of the LoginController
	 * @param {*} controller The implementation to inject
	 */
	setController(controller) {
		this.loginController = controller;
		this.loginControllerIsSet = true;
	}
}

export default LoginControllerWrapper;