import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import PropTypes from 'prop-types';
import ProviderAuth from './ProviderAuth'



class LoginForm extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        firebaseApp: PropTypes.object.isRequired
    }
    render() {
        const {
            className,
            firebaseApp
        } = this.props;

        return (
            <form className={"form form--login " + className}>
                <ProviderAuth actionText="Log In" firebaseApp={firebaseApp} />
                <div className="form-group">
                    <label htmlFor="email" className="form__label">Email</label>
                    <input id="email" className="form__input form-control" />
                    <div className="form__error form__error--hidden">Error</div>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form__label">Password</label>
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
