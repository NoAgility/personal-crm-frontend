import CookieManager from './CookieManager';
const AuthService = {

	/**
	 * Checks if user is logged in
	 * @returns {boolean} true if user is logged in
	 */
	isLoggedIn : function() {
		return CookieManager.getCookie("jwt") != null;
	},
	/**
	 * Logs the user out
	 */
	logOut : function () {
		CookieManager.eraseCookies();
		window.location.href = "/login";
	}
}

export default AuthService;