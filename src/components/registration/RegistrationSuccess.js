import './Registration.css'

const RegistrationSuccess = (props) => {


    return (
        <div className="background">
            <h1>
                Registration Success
                <div className="form-field-container">
                    <button role="button" name="login" className="form-back" type="button" onClick={ () => {window.location.href = '/login' }}>Back to Login</button>
                </div>
            </h1>
        </div>
    )
}

export default RegistrationSuccess;