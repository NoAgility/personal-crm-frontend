import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BiHide, BiShow} from 'react-icons/bi';
import './Registration.css';
import Controller from './RegistrationController';
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
    

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const show = <BiShow className="show-hide-icon" onClick={togglePassword}/>;
    const hide = <BiHide className="show-hide-icon" onClick={togglePassword}/>;
    
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
        const chain = {
            errorFunction: [setErrorUsername, setErrorUsername, setErrorName, setErrorPassword, setErrorDOB],
            command: [Controller.isValidUsername, Controller.isTakenUsername, Controller.isValidName, Controller.isValidPassword, Controller.isValidDOB]
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
        try {
            Controller.Register(userDetails);
        } catch (err) {
            setGeneralError(err)
            return;
        }
        
        setGeneralError("Done");
        history.push('/registration_success');
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
                    <input data-testid="name" name="name" className="form-input" type="text" value={props.firstName} placeholder="Name" onChange={ (e) => setName(e.target.value) }/>
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