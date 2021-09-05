import axios from 'axios';


const fetch = (aUrl, headers) => {
    return axios({
        method: 'GET',
        url: 'http://' + process.env.REACT_APP_BACKEND_URL + aUrl,
        headers: headers
    })
};


export default fetch;