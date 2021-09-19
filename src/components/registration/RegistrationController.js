import { fetch, post } from '../../util/SpringBootAdapter'

const Controller = {
    Register : async (userDetails) => {
        var flag = await post(`/account/create`, {}, {
            username: userDetails.username,
            password: userDetails.password,
            name: userDetails.name,
            dob: userDetails.dob,
        }).then(response => { return true; }).catch(err => {return false;});
        if (!flag) {
            throw new Error("Failed to create account, please try again later");
        }
    },
    isValidUsername : async (userDetails) => {

        if (userDetails.username === undefined || userDetails.username.length === 0) {
            throw new Error('Username must be provided');
        }
        // Check for length
        if (userDetails.username.length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }
    
        //Check for non-word characters
        if (userDetails.username.match(/^.*[\W].*$/)) {
            throw new Error('Username must only contain a-z, 0-9 and _');
        }
    },
    isTakenUsername : async (userDetails) => {
        //Check for existing username
        var response = await fetch(`/account/get?username=${userDetails.username}`).then(response => { return response; });
        if (!(response.data === undefined || response.data.length === 0)) {
            throw new Error('Username is already taken');
        }
    },
    isValidPassword : (userDetails) => {
        if (userDetails.password === undefined || userDetails.password.length === 0) {
            throw new Error('Please provide a password');
        }
        if (userDetails.password.length < 4) {
            throw new Error('Password must be at least 4 characters long');
        }
    },
    isValidName : (userDetails) => {
        if (userDetails.name === undefined || userDetails.name.length === 0) {
            throw new Error('Name must not be empty!')
        }
        if (userDetails.name.match(/^.*[^A-Za-z ].*$/)) {
            throw new Error('Name must only contain letters')
        }
    },
    isValidDOB : (userDetails) => {
        if (userDetails.dob === undefined || userDetails.dob.length === 0) {
            throw new Error('DOB must be set');
        }
    }
}

export default Controller;