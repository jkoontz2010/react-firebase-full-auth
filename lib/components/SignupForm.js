import React from 'react';
import PropTypes from 'prop-types';
import ProviderAuth from './ProviderAuth'
import ValidatingForm from './ValidatingForm'
import ValidatingInput from './ValidatingInput'
import {isRequired, isEmail, validPassword} from '../utils/validators'

import 'bootstrap/dist/css/bootstrap.css'

class SignupForm extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        firebaseApp: PropTypes.object.isRequired
    }
    constructor() {
        super();
        this.state = {
            errors: {
                server: ""
            },
            isProcessing: false
        }
    }

    handleSubmit = (formModel) => {

        const { firebaseApp } = this.props;
        const { email, password } = formModel;
        this.setState({
            isProcessing: true,
            errors: {
                server: ""
            }
        });
        
        firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(() => { 

        }).catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;

            this.setState({
                errors: Object.assign({}, this.state.errors, {server: errorMessage}),
                isProcessing: false
            })
        })
    }

    render() {
        const {
            className,
            firebaseApp
        } = this.props;

        const {
            errors
        } = this.state;

        return (
            <ValidatingForm onSubmit={this.handleSubmit} className={"form form--signup " + className}>
                <ProviderAuth actionText="Sign up" firebaseApp={firebaseApp} />
                <ValidatingInput
                    label="Email"
                    name="email"
                    type="text"
                    validators={[isRequired, isEmail]}
                    />
                <ValidatingInput
                    label="Password"
                    name="password"
                    type="password"
                    validators={[isRequired, validPassword]}
                    />
                
                <button type="submit" disabled={this.state.isProcessing}
                    className={`form__submit button ${this.state.isProcessing ? 'form__submit--disabled' : ''}`}>Submit</button>
                {errors.server.length > 0 && <div className="form__error">{errors.server}</div>}
            </ValidatingForm>
        )
    }
}

export default SignupForm;
