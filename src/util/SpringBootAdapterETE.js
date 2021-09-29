import axios from 'axios';
import CookieManager from './CookieManager';
import SpringBootAdapter from './SpringBootAdapter';

const SpringBootAdapterETE = new Object(SpringBootAdapter);

SpringBootAdapterETE.get = (aUrl, aHeaders) => {
    const defaultHeaders = {
        "Cookie": document.cookie
    }
    return axios.get(process.env.REACT_APP_BACKEND_URL + aUrl, 
        {
        withCredentials: true, 
        headers: aHeaders === null ? defaultHeaders : Object.assign(defaultHeaders, aHeaders),
    })
};

SpringBootAdapterETE.post = (aUrl, aHeaders, body) => {
    const defaultHeaders = {
        "Cookie": document.cookie
    }
    return axios.post(process.env.REACT_APP_BACKEND_URL + aUrl,
        body,
        {
            withCredentials: true, 
            headers: aHeaders === null ? defaultHeaders : Object.assign(defaultHeaders, aHeaders)
        }
    )
};


export default SpringBootAdapterETE;