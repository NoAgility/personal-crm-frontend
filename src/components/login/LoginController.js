
const LoginController = () => {
	return {
		login : () => {
			throw new Error("Abstract method!");
		}
	};
}

export default LoginController;