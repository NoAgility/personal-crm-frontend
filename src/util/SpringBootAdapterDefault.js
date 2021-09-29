import axios from 'axios';
import CookieManager from './CookieManager';
import SpringBootAdapter from './SpringBootAdapter';
const SpringBootAdapterDefault = new Object(SpringBootAdapter);

SpringBootAdapterDefault.get = (aUrl, aHeaders) => {
    return axios.get(process.env.REACT_APP_BACKEND_URL + aUrl, 
        {
        withCredentials: true, 
        headers: aHeaders
    })
};
SpringBootAdapterDefault.post = (aUrl, aHeaders, body) => {
    return axios.post(process.env.REACT_APP_BACKEND_URL + aUrl,
        body,
        {
            withCredentials: true, 
            headers: aHeaders
        }
    )
};


export default SpringBootAdapterDefault;