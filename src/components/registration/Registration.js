import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BiHide, BiShow} from 'react-icons/bi';
import './Registration.css';
import RegistrationController from './RegistrationController';
const Registration = (props) => {

    // Get the referral parameter from the url in "/register/referral/:referral"
    const { referral } = useParams();

    const history = useHistory();

    const [username, setUsername] = useState("");
    const [FName, setFName] = useState("");
    const [LName, setLName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [DOB, setDOB] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
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

        if (password !== passwordConfirm) {
            setErrorPassword("Passwords do not match!");
            return;
        }
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
        if (referral === undefined) {
            flag && RegistrationController.register(userDetails).then(() => history.push('/registration_success')).catch(err => setErrorUsername(err.toString()));
        } else {
            flag && RegistrationController.registerReferral(userDetails, referral).then(() => history.push('/registration_success')).catch(err => setErrorUsername(err.toString()));
        }
    }

    const onFocus = (e) => {
        e.currentTarget.type = "date";
    };
    const onBlur = (e) => {
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Date of Birth";
        e.currentTarget.value = new Date(DOB).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    return (
        <div className="background">
            <button className="landing-back-button" onClick={() => history.push("/landing")}>Back to Landing</button>
            <form className="registration-form" onSubmit={onSubmit}>
                <h1>
                    Create An Account
                </h1>
                <div className="form-field-container">
                    <div data-testid='username-error' className='error'>{errorUsername}</div>
                    <input data-testid="username" name="username" className="registration-form-input" type="text" value={username} placeholder="Username" maxLength={45} onChange={ (e) => setUsername(e.target.value) }/>
                </div>
                <div className="form-field-container">
                <div data-testid='name-error' className='error'>{errorName}</div>
                    <input data-testid="fname" name="fname" className="registration-form-input" type="text" value={FName} placeholder="First Name" maxLength={45} onChange={ (e) => setFName(e.target.value) }/>
                    <input data-testid="lname" name="lname" className="registration-form-input" type="text" value={LName} placeholder="Last Name" maxLength={45} onChange={ (e) => setLName(e.target.value) }/>
                </div>
                <div className="form-field-container">
                    <div data-testid='password-error' className='error'>{errorPassword}</div>
                    <div>
                        <input data-testid="password" name="password" className="registration-form-input" type={passwordShown ? "text" : "password"} value={password} placeholder="Password" maxLength={45} onChange={ (e) => setPassword(e.target.value) }/>
                        {passwordShown ? show : hide}
                    </div>
                    <input data-testid="password" name="password" className="registration-form-input" type="password" value={passwordConfirm} placeholder="Confirm Password" maxLength={45} onChange={ (e) => setPasswordConfirm(e.target.value) }/>
                </div>
                <div className="form-field-container">
                    <div data-testid='dob-error'className='error'>{errorDOB}</div>
                    <input data-testid="DOB" className="registration-form-input" name="DOB" onBlur={onBlur} onFocus={onFocus} type="date" value={DOB} onChange={ (e) => setDOB(e.target.value) }/>
                </div>
                <div className="form-field-container">
                <div data-testid='general-error' className='error'>{generalError}</div>
                    <button data-testid="submit" name="submit" className="form-submit" type="submit" onClick={ onSubmit }>Submit</button>
                    <button data-testid="login" name="login" className="form-back" type="button" onClick={ () => { history.push('/login');}}>To Login</button>
                </div>
            </form>
        </div>
    )
}

export default Registration;