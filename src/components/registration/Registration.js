import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BiHide, BiShow} from 'react-icons/bi';
import './Registration.css';
import RegistrationController from './RegistrationController';
const Registration = (props) => {

    const history = useHistory();

    const [username, setUsername] = useState("");
    const [FName, setFName] = useState("");
    const [LName, setLName] = useState("");
    const [password, setPassword] = useState("");
    const [DOB, setDOB] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorDOB, setErrorDOB] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    
    /**
     * Function to make password visible
     */
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    /**
     * Password show toggle icons
     */
    const show = <BiShow className="show-hide-icon" onClick={togglePassword}/>;
    const hide = <BiHide className="show-hide-icon" onClick={togglePassword}/>;
    
    /**
     * Function called on submission of registration form
     * @param {*} e The triggering event
     */
    const onSubmit = async (e) => {
        e.preventDefault();
        var userDetails = {
            username: username,
            password: password,
            fName: FName.trim(),
            lName: LName.trim(),
            dob: DOB
        }

        /**
         * Collect all the possible username checks and call them against the user input
         */
        const chain = [
                { 
                    func: async () => {
                        setErrorUsername("");
                        await RegistrationController.isValidUsername(userDetails);
                    },
                    errCallback: setErrorUsername
                },
                {
                    func: async () => {
                        setErrorName("");
                        await RegistrationController.isValidFName(userDetails);
                    },
                    errCallback: setErrorName
                },
                {
                    func: async () => {
                        setErrorName("");
                        await RegistrationController.isValidLName(userDetails);
                    },
                    errCallback: setErrorName
                },
                {
                    func: async () => {
                        setErrorPassword("");
                        await RegistrationController.isValidPassword(userDetails);
                    },
                errCallback: setErrorPassword
                },
                {
                    func: async () => {
                        setErrorPassword("");
                        await RegistrationController.isValidDOB(userDetails);
                    },
                errCallback: setErrorDOB
                },
            ];
        const promises = [];
        var flag = true;
        chain.forEach(pair => promises.push(pair.func().catch(err => { flag = false; pair.errCallback(err.toString().slice(7))})));
        await Promise.allSettled(promises);

            /**
             * If the user gets to this stage, checks have completed, so register
             */
        flag && RegistrationController.register(userDetails).then(() => history.push('/registration_success')).catch(err => setErrorUsername(err.toString()));
    }
    return (
        <div className="background">
            <form className="registration-form" onSubmit={onSubmit}>
                <h1>
                    Create An Account
                </h1>
                <div className="form-field-container">
                    <div data-testid='username-error' className='error'>{errorUsername}</div>
                    <input data-testid="username" name="username" className="form-input" type="text" value={props.username} placeholder="Username" onChange={ (e) => setUsername(e.target.value) }/>
                </div>
                <div className="form-field-container">
                <div data-testid='name-error' className='error'>{errorName}</div>
                    <input data-testid="fname" name="fname" className="form-input" type="text" value={FName} placeholder="First Name" onChange={ (e) => setFName(e.target.value) }/>
                    <input data-testid="lname" name="lname" className="form-input" type="text" value={LName} placeholder="Last Name" onChange={ (e) => setLName(e.target.value) }/>
                </div>
                <div className="form-field-container">
                    <div data-testid='password-error' className='error'>{errorPassword}</div>
                    <input data-testid="password" name="password" className="form-input" type={passwordShown ? "text" : "password"} value={props.password} placeholder="Password" onChange={ (e) => setPassword(e.target.value) }/>
                    {passwordShown ? show : hide}
                </div>
                <div className="form-field-container">
                    <div data-testid='dob-error'className='error'>{errorDOB}</div>
                    <input data-testid="DOB" name="DOB" className="form-input" type="date" value={props.DOB} onChange={ (e) => setDOB(e.target.value) }/>
                </div>
                <div className="form-field-container">
                <div data-testid='general-error' className='error'>{generalError}</div>
                    <button data-testid="submit" name="submit" className="form-submit" type="submit" onClick={ onSubmit }>Submit</button>
                    <button data-testid="login" name="login" className="form-back" type="button" onClick={ () => { history.push('/login');}}>Back to Login</button>
                </div>
            </form>
        </div>
    )
}

export default Registration;