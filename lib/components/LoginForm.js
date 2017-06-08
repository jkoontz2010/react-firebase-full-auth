import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class LoginForm extends React.Component {
    render() {
        const {
            className
        } = this.props;

        return (
            <form className={"form form--login " + className}>
                <div className="form-group">
                    <label htmlFor="email" class="form__label">Email</label>
                    <input id="email" className="form__input form-control" />
                    <div className="form__error form__error--hidden">Error</div>
                </div>
                <div className="form-group">
                    <label htmlFor="password" class="form__label">Password</label>
                    <input id="password" type="password" className="form__input form-control" />
                    <div className="form__error form__error--hidden">Error</div>
                </div>
                <div className="form__pwd-reset">
                    <a href="#">Forgot password?</a>
                </div>
                
                
                <button className="form__submit form__submit--disabled button">Submit</button>
            </form>
        )
    }
}

export default LoginForm;
