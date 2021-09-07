import "./Login.css";
import { useState } from "react";
import { BiHide, BiShow} from 'react-icons/bi';
import { useHistory } from 'react-router-dom';

function onSubmit() {
	// TO DO: Implement function
}

const Login = () => {

    const history = useHistory();
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const show = <BiShow className="show-hide-icon" onClick={togglePassword}/>;
    const hide = <BiHide className="show-hide-icon" onClick={togglePassword}/>;

	return (
        <div className="login">
            <form onSubmit={onsubmit}>
                <h1>Login</h1>
                <div className="input">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                    />
                </div>
                <div className="input">
                    <input
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                    {passwordShown ? show : hide}
                </div>
                <div className="buttons">
                    <button type="submit">Login</button>
                    <button class="register" type="button" onClick={ () => { history.push('register') } }>Register</button>
                </div>
            </form>
        </div>
	)
}

export default Login;