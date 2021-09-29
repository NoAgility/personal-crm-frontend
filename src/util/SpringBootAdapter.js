import axios from 'axios';
import CookieManager from './CookieManager';

const SpringBootAdaptor = () => {
    return {
        get: () => {
            throw new Error("Abstract method");
        },
        post: () => {
            throw new Error("Abstract method");
        }
    }
};




export default SpringBootAdaptor;