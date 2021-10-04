
/**
 * Abstract LoginController class, represents a base class for a login controller
 * @returns LoginController object
 */
const LoginController = () => {
	return {
		login : () => {
			throw new Error("Abstract method!");
		}
	};
}

export default LoginController;