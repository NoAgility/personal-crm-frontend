import React, { useState } from 'react';
import './Registration.css';
import Register, { CheckForUsername, CheckForPassword } from './RegistrationController';
const Registration = (props) => {
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [DOB, setDOB] = useState("");
    const [errorUserName, setErrorUserName] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorPassWord, setErrorPassWord] = useState("");
    const [errorDOB, setErrorDOB] = useState("");
    const onSubmit = (e) => {
        e.preventDefault()

        CheckForUsername({
            username: props.userName
        });
        if (!CheckForPassword({
            password: props.passWord
        })) {
            props.errorUserName="Password must be at least 4 characters long";
        }
        Register({
            username: props.userName,
            password: props.passWord,
            name: props.name,
            dob: props.DOB
        })
    }
    
    return (<div>
        <form className="registration-form" onSubmit={onSubmit}>
            <div className="form-content-container">
                <div className="form-title">
                    Create An Account
                </div>
                <ul className="form-list">
                    <li className="form-item">
                        <div className="form-field-container">
                            <label className="form-label">Username</label><label className="form-error">{props.errorUserName}</label>
                            <p/>
                            <input name="userName" className="form-input" type="text" value={props.userName} onChange={ (e) => setUserName(e.target.value) }/>
                        </div>
                    </li>
                    <li className="form-item">
                        <div className="form-field-container">
                            <label className="form-label">Name</label><label className="form-error">{props.errorName}</label>
                            <p/>
                            <input name="name" className="form-input" type="text" value={props.firstName} onChange={ (e) => setName(e.target.value) }/>
                        </div>
                    </li>
                    <li className="form-item">
                        <div className="form-field-container">
                            <label className="form-label">Password</label><label className="form-error">{props.errorPassWord}</label>
                            <p/>
                            <input name="passWord" className="form-input" type="text" value={props.passWord} onChange={ (e) => setPassWord(e.target.value) }/>
                        </div>
                    </li>
                    <li className="form-item">
                        <div className="form-field-container">
                            <label className="form-label">Date of Birth</label><label className="form-error">{props.errorDOB}</label>
                            <p/>
                            <input name="DOB" className="form-input" type="date" value={props.DOB} onChange={ (e) => setDOB(e.target.value) }/>
                        </div>
                    </li>
                    <li className="form-item">
                        <div className="form-field-container">
                            <input name="submit" className="form-submit" type="submit" value="Submit"/>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    </div>)
}

export default Registration;