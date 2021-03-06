const CookieManager = {
    setCookie : (name,value,days) => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },
    getCookie : (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },
    setCookieRaw : (value) => {
        document.cookie = value;
    },
    eraseCookies : (name) => {   
        document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${process.env.REACT_APP_MAIN_DOMAIN}`;
        document.cookie = `accountID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${process.env.REACT_APP_MAIN_DOMAIN}`
    }
}

export default CookieManager;