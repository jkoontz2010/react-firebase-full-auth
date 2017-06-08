import React from 'react';
import PropTypes from 'prop-types';
import ProviderAuth from './ProviderAuth'

import 'bootstrap/dist/css/bootstrap.css'

class SignupForm extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        firebaseApp: PropTypes.object.isRequired,
        handleAuth: PropTypes.func.isRequired
    }
    render() {
        const {
            className,
            firebaseApp,
            handleAuth
        } = this.props;

        return (
            <form className={"form form--signup " + className}>
                <ProviderAuth actionText="Sign up" firebaseApp={firebaseApp} handleAuth={handleAuth}/>
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

                <div className="form-group">
                    <label htmlFor="re-password" className="form__label">Re-type Password</label>
                    <input id="re-password" type="password" className="form__input form-control" />
                    <div className="form__error form__error--hidden">Error</div>
                </div>
                
                <button className="form__submit form__submit--disabled button">Submit</button>
            </form>
        )
    }
}

export default SignupForm;
