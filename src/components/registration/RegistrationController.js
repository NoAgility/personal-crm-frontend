import SpringBootAdapterWrapper from '../../util/SpringBootAdapterWrapper'

/**
 * RegistrationController singleton
 * Used as the interface to the registration enablement in the backend API
 */
const RegistrationController = {
    /**
     * Register a user
     * @param {*} userDetails The user details to register with
     */
    Register : async (userDetails) => {
        var flag = await SpringBootAdapterWrapper.post(`/account/create`, {}, {
            username: userDetails.username,
            password: userDetails.password,
            name: userDetails.name,
            dob: userDetails.dob,
        }).then(response => { return true; }).catch(err => {return false;});
        if (!flag) {
            throw new Error("Failed to create account, please try again later");
        }
    },
    /**
     * Checks if valid username
     * @param {*} userDetails The user details to check 
     */
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
    /**
     * Checks if username is taken
     * @param {*} userDetails The user details to check
     */
    isTakenUsername : async (userDetails) => {
        //Check for existing username
        var response = await SpringBootAdapterWrapper.get(`/account/get?username=${userDetails.username}`).then(response => { return response; }).catch(err => { return err; });
        if (!(response.data === undefined || response.data.length === 0)) {
            throw new Error('Username is already taken');
        }
    },
    /**
     * Checks if password is valid
     * @param {*} userDetails The user details to check
     */
    isValidPassword : (userDetails) => {
        if (userDetails.password === undefined || userDetails.password.length === 0) {
            throw new Error('Please provide a password');
        }
        if (userDetails.password.length < 4) {
            throw new Error('Password must be at least 4 characters long');
        }
    },
    /**
     * Checks if name is valid
     * @param {*} userDetails The user details to check
     */
    isValidName : (userDetails) => {
        if (userDetails.name === undefined || userDetails.name.length === 0) {
            throw new Error('Name must not be empty!')
        }
        if (userDetails.name.match(/^.*[^A-Za-z ].*$/)) {
            throw new Error('Name must only contain letters')
        }
    },
    /**
     * Checks if DOB is valid
     * @param {*} userDetails The user details to check
     */
    isValidDOB : (userDetails) => {
        if (userDetails.dob === undefined || userDetails.dob.length === 0) {
            throw new Error('DOB must be set');
        }
    }
}

export default RegistrationController;