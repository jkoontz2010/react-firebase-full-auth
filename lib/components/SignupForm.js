import React from 'react';
import PropTypes from 'prop-types';
import ProviderAuth from './ProviderAuth'
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

    handleSubmit = (event) => {
        event.preventDefault();

        const { firebaseApp } = this.props;
        const { email, password, invalidCount } = this.state;

        if(invalidCount > 0) return;

        this.setState({
            isProcessing: true
        })
        

        firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(() => { 
            this.setState({
                email: "",
                password: ""
            })
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

    handleInputChange = (event) =>{        
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleValidity = (name, invalids) => {
        this.setState({
            invalidCount: Object.assign({}, this.state.invalidCount, {[name]: invalids})
        })
    }

    isValid = () => {
        const { invalidCount } = this.state;
        let validity = true;
        Object.keys(invalidCount).forEach(key => {
            if (invalidCount[key] > 0) validity = false;
        });

        return validity;
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
        const isEmail = (value) => value.indexOf("@") === -1 ? "Invalid email" : undefined; 
        const invalid = !this.isValid();
        return (
            <form onSubmit={this.handleSubmit} className={"form form--signup " + className}>
                <ProviderAuth actionText="Sign up" firebaseApp={firebaseApp} />
                <ValidatingInput
                    label="Email"
                    name="email"
                    type="text"
                    value={email}
                    handleChange={this.handleInputChange}
                    handleValidity={this.handleValidity}
                    validators={[isRequired, isEmail]}
                    />
                <ValidatingInput
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    handleChange={this.handleInputChange}
                    handleValidity={this.handleValidity}
                    validators={[isRequired]}
                    />
                
                <button type="submit" disabled={invalid} 
                    className={`form__submit button ${invalid ? 'form__submit--disabled' : ''}`}>Submit</button>
                {errors.server.length > 0 && <div className="form__error">{errors.server}</div>}
            </form>
        )
    }
}

export default SignupForm;
