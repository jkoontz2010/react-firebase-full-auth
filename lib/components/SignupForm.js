import React from 'react';
import PropTypes from 'prop-types';
import ProviderAuth from './ProviderAuth'
import ValidatingForm from './ValidatingForm'
import ValidatingInput from './ValidatingInput'
import 'bootstrap/dist/css/bootstrap.css'

class SignupForm extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        firebaseApp: PropTypes.object.isRequired
    }
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            invalidCount: {},
            errors: {
                server: ""
            }
        }
    }

    handleSubmit = (formModel, resetCb) => {

        const { firebaseApp } = this.props;
        const { email, password } = formModel;
        this.setState({
            isProcessing: true
        })
        
        firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(() => { 
            console.log("WOO!")
            resetCb();
        }).catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.error("whoops,",errorMessage)
            this.setState({
                errors: Object.assign({}, this.state.errors, {server: errorMessage})
            })
        });
    }

    render() {
        const {
            className,
            firebaseApp
        } = this.props;

        const {
            email,
            password,
            invalidCount,
            errors
        } = this.state;

        const isRequired = (value) => value.length === 0 ? "Required" : undefined;
        const isEmail = (value) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? undefined : "Invalid email"; 
        const validPassword = (value) => value.length < 6 ? "Password must be at least 6 characters" : undefined;

        return (
            <ValidatingForm onSubmit={this.handleSubmit} className={"form form--signup " + className}>
                <ProviderAuth actionText="Sign up" firebaseApp={firebaseApp} />
                <ValidatingInput
                    label="Email"
                    name="email"
                    type="text"
                    value={email}
                    validators={[isRequired, isEmail]}
                    />
                <ValidatingInput
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    validators={[isRequired, validPassword]}
                    />
                
                <button type="submit"  
                    className={`form__submit button`}>Submit</button>
                {errors.server.length > 0 && <div className="form__error">{errors.server}</div>}
            </ValidatingForm>
        )
    }
}

export default SignupForm;
