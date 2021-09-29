
function LoginController() {

}

LoginController.prototype.login = () => {
	throw new Error("Abstract method!");
}

export default LoginController;