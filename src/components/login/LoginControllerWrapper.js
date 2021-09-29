import LoginController from './LoginController';

const LoginControllerWrapper = {
	loginController: LoginController(),
	loginControllerIsSet: false,
	Login(user) {
		return this.loginControllerIsSet && this.loginController.login(user);
	},
	setController(controller) {
		this.loginController = controller;
		this.loginControllerIsSet = true;
	}
}

export default LoginControllerWrapper;