import "./Login.css";
import { useState } from "react";
import { BiHide, BiShow} from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import LoginController from './LoginController';
import { Redirect } from "react-router-dom";

const Login = () => {
    const history = useHistory();
    const [passwordShown, setPasswordShown] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [generalError, setGeneralError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        LoginController.Login({
            username: username,
            password: password
        });
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const show = <BiShow className="show-hide-icon" onClick={togglePassword}/>;
    const hide = <BiHide className="show-hide-icon" onClick={togglePassword}/>;

	return (
        <div className="login">
            <form className="login-form" onSubmit={onsubmit}>
                <h1>Login</h1>
                <div data-testid='general-error' className='error'>{generalError}</div>
                <div className="input">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className="login-input"
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
                    />
                    {passwordShown ? show : hide}
                </div>
                <div className="buttons">
                    <button className="login-button" type="submit">Login</button>
                    <button class="register" type="button" onClick={ () => { history.push('register') } }>Register</button>
                </div>
            </form>
        </div>
	)
}

export default Login;