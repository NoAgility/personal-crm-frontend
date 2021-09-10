const AuthService = {

	isLoggedIn: function(name) {
		return this.getCookie("jwt") != null;
	},
	getCookie: (name) => {
		var key = name + "=";
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var c = cookies[i];
			while (c.charAt(0) === ' ') c = c.substring(1);
			if (c.indexOf(name) === 0)
				return c.substring(name.length, c.length);
		}
		return null;
	},
	setCookie: (name, value, days) => {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/";
	},

	eraseCookie: (name) => {
		document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	},

	username: null,

	userId: null


}

export default AuthService;