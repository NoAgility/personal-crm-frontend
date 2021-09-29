import axios from 'axios';
import CookieManager from './CookieManager';

function SpringBootAdaptor() {

};

SpringBootAdaptor.prototype.get = () => {
    throw new Error("Abstract method");
}
SpringBootAdaptor.prototype.post = () => {
    throw new Error("Abstract method");
}


export default SpringBootAdaptor;