import axios from 'axios';


const fetch = (aUrl, headers) => {
    return axios.get(process.env.REACT_APP_BACKEND_URL + aUrl, {withCredentials: true})
};

const post = (aUrl, headers, body) => {

    return axios.post(process.env.REACT_APP_BACKEND_URL + aUrl,
         body,
         {withCredentials: true})
}


export { fetch, post };