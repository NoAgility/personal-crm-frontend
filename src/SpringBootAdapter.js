import axios from 'axios';


const fetch = (aUrl, headers) => {
    return axios({
        method: 'GET',
        url: 'http://' + process.env.REACT_APP_BACKEND_URL + aUrl,
        headers: headers
    })
};

const post = (aUrl, headers, body) => {

    var aHeaders = {
        'Content-Type': 'application/json',
    };
    aHeaders = headers !== null ? Object.assign(headers, aHeaders) : aHeaders;
    return axios({
        method: 'POST',
        url: 'http://' + process.env.REACT_APP_BACKEND_URL + aUrl,
        headers: aHeaders,
        data: body
    })
}


export { fetch, post };