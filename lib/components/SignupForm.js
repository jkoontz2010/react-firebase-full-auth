import React from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.css'

class SignupForm extends React.Component {
    static propTypes = {
        className: PropTypes.string
    }
    render() {
        const {
            className
        } = this.props;

        return (
            <form className={"form form--signup " + className}>
                
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

                <div className="form-group">
                    <label htmlFor="re-password" class="form__label">Re-type Password</label>
                    <input id="re-password" type="password" className="form__input form-control" />
                    <div className="form__error form__error--hidden">Error</div>
                </div>
                
                <button className="form__submit form__submit--disabled button">Submit</button>
            </form>
        )
    }
}

export default SignupForm;
