import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class LoginForm extends React.Component {
    render() {
        return (
            <form className="login-form">
                <label>email
                    <input type="text" className="primary-input"/>
                </label>
                <label>password
                    <input type="text" className="primary-input"/>
                </label>
                <button type="submit" className="button-primary">Submit</button>
            </form>
        )
    }
}

export default LoginForm;
