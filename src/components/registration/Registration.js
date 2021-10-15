import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BiHide, BiShow} from 'react-icons/bi';
import './Registration.css';
import RegistrationController from './RegistrationController';
const Registration = (props) => {

    const history = useHistory();

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
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
        setGeneralError("Loading...");
        var userDetails = {
            username: username,
            password: password,
            name: name,
            dob: DOB
        }
        var errorFlag = false;

        /**
         * Collect all the possible username checks and call them against the user input
         */
        const chain = {
            errorFunction: [setErrorUsername, setErrorUsername, setErrorName, setErrorPassword, setErrorDOB],
            command: [RegistrationController.isValidUsername, RegistrationController.isTakenUsername, RegistrationController.isValidName, RegistrationController.isValidPassword, RegistrationController.isValidDOB]
        }
        for (var i = 0; i < chain.errorFunction.length; i++) {
            try {
                await chain.command[i](userDetails);
                chain.errorFunction[i]("");
            } catch (err) {
                chain.errorFunction[i](err.toString());
                errorFlag = true;
            }
        }
        if (errorFlag) { setGeneralError("Failed"); return; }

        /**
         * If the user gets to this stage, checks have completed, so register
         */
        try {
            RegistrationController.Register(userDetails);
        } catch (err) {
            setGeneralError(err)
            return;
        }
        
        setGeneralError("Done");
        
        history.push('/registration_success');
    }

    const onFocus = (e) => {
        e.currentTarget.type = "date";
    };
    const onBlur = (e) => {
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Date of Birth";
        e.currentTarget.value = new Date(DOB).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
    };
    console.log(props.DOB);
    return (
        <div className="background">
            <form className="registration-form" onSubmit={onSubmit}>
                <h1>
                    Create An Account
                </h1>
                <div className="form-field-container">
                    <div data-testid='username-error' className='error'>{errorUsername}</div>
                    <input data-testid="username" name="username" className="form-input" type="text" value={username} placeholder="Username" onChange={ (e) => setUsername(e.target.value) }/>
                </div>
                <div className="form-field-container">
                <div data-testid='name-error' className='error'>{errorName}</div>
                    <input data-testid="name" name="name" className="form-input" type="text" value={name} placeholder="Name" onChange={ (e) => setName(e.target.value) }/>
                </div>
                <div className="form-field-container">
                    <div data-testid='password-error' className='error'>{errorPassword}</div>
                    <input data-testid="password" name="password" className="form-input" type={passwordShown ? "text" : "password"} value={password} placeholder="Password" onChange={ (e) => setPassword(e.target.value) }/>
                    {passwordShown ? show : hide}
                </div>
                <div className="form-field-container">
                    <div data-testid='dob-error'className='error'>{errorDOB}</div>
                    <input data-testid="DOB" className="form-input" name="DOB" onBlur={onBlur} onFocus={onFocus} type="date" value={DOB} onChange={ (e) => setDOB(e.target.value) }/>
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