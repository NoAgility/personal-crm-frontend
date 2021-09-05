import React, { useState } from 'react';
import './Registration.css';

const Registration = (props) => {

    const onSubmit = () => {
        console.log(props);
    }
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [DOB, setDOB] = useState("");
    return (<div>
        <form className="registration-form" onSubmit={onSubmit}>
            <ul className="form-list">
                <li className="form-item">
                    <label className="form-label" for="userName">Username</label>
                    <input name="userName" className="form-input" type="text" value={props.userName} onChange={ (e) => setUserName(e.target.value) }/>
                </li>
                <li className="form-item">
                    <label className="form-label" for="firstName">First Name</label>
                    <input name="firstName" className="form-input" type="text" value={props.firstName} onChange={ (e) => setFirstName(e.target.value) }/>
                </li>
                <li className="form-item">
                    <label className="form-label" for="lastName">Last Name</label>
                    <input name="lastName" className="form-input" type="text" value={props.lastName} onChange={ (e) => setLastName(e.target.value) }/>
                </li>
                <li className="form-item">
                    <label className="form-label" for="passWord">Password</label>
                    <input name="passWord" className="form-input" type="text" value={props.passWord} onChange={ (e) => setPassWord(e.target.value) }/>
                </li>
                <li className="form-item">
                    <label className="form-label" for="DOB">Date of Birth</label>
                    <input name="DOB" className="form-input" type="date" value={props.DOB} onChange={ (e) => setDOB(e.target.value) }/>
                </li>
                <li className="form-item">
                    <input name="submit" className="form-submit" type="submit" value="Submit"/>
                </li>
            </ul>
        </form>
    </div>)
}

export default Registration;