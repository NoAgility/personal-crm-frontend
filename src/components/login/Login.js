import "./Login.css";
import { useState } from "react";
import { BiHide, BiShow} from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import LoginController from './LoginController';

const Login = () => {
    const [error, setError] = useState("");
    const history = useHistory();
    const [passwordShown, setPasswordShown] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [redirect, setRedirect] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
            await LoginController.Login({
                username: username,
                password: password
            }).then(() => history.push("/home")).catch(err => setError(err.toString()));
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const show = <BiShow className="show-hide-icon" onClick={togglePassword}/>;
    const hide = <BiHide className="show-hide-icon" onClick={togglePassword}/>;
	return (
        <div data-testid="container" className="login-container">
            {error}
            <form className="login-form" onSubmit={onSubmit}>
                <h1>Login</h1>
                <div data-testid='general-error' className='error'>{generalError}</div>
                <div className="input">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        placeholder="Username"
                        className="login-input"
                        onChange={event => {setUsername(event.target.value)}}
                    />
                </div>
                <div className="input">
                    <input
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        id="password"
                        value={password}
                        placeholder="Password"
                        className="login-input"
                        onChange={event => {setPassword(event.target.value)}}
                    />
                    {passwordShown ? show : hide}
                </div>
                <div className="buttons">
                    <button className="login-button" data-testid="submit" type="submit">Login</button>
                    <button className="register" type="button" onClick={ () => { history.push('register') } }>Register</button>
                </div>
            </form>
        </div>
	)
}

export default Login;