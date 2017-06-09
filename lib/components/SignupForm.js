import React from 'react';
import PropTypes from 'prop-types';
import ProviderAuth from './ProviderAuth'

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
            errors: {
                email: "",
                password: "",
                server: ""
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { firebaseApp } = this.props;

        const { email, password } = this.state;

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

        const validationCallback = this.state.errors[name].length > 0 ? this.handleValidation : () => {};


        this.setState({
            [name]: value
        }, validationCallback(event));
        
    }
    handleValidation = (event) => {
        const { name, value } = event.target;
        console.log("vlidating", name, value)
        const newErrorObject = {};

        switch(name) {
            case "email":
                const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!emailRegex.test(value)) {
                    newErrorObject.email = "Invalid email address.";
                } else {
                    newErrorObject.email = "";
                }
                break;
            case 'password':
                if(value.length < 6) {
                    newErrorObject.password = "Password too short.";
                } else {
                    newErrorObject.password = "";
                }
                break;
        }

        this.setState({
            errors: Object.assign({}, this.state.errors, newErrorObject)
        })
    }

    render() {
        const {
            className,
            firebaseApp
        } = this.props;

        const {
            email,
            password,
            errors
        } = this.state;

        const isInvalid = email.length < 1 || password.length < 6 || errors.email.length > 0 || errors.password.length > 0;

        return (
            <form onSubmit={this.handleSubmit} className={"form form--signup " + className}>
                <ProviderAuth actionText="Sign up" firebaseApp={firebaseApp} />
                <div className="form-group">
                    <label htmlFor="email" className="form__label">Email</label>
                    <input id="email" 
                        type="email" 
                        name="email"
                        value={email} 
                        onChange={this.handleInputChange} 
                        onBlur={this.handleValidation}
                        className="form__input form-control" />
                    {errors.email.length > 0 && <div className="form__error">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form__label">Password</label>
                    <input id="password" 
                        type="password" 
                        name="password"
                        value={password} 
                        onChange={this.handleInputChange} 
                        onBlur={this.handleValidation}
                        className="form__input form-control" />
                    {errors.password.length > 0 && <div className="form__error">{errors.password}</div>}
                </div>
                
                <button type="submit" disabled={isInvalid} 
                    className={`form__submit button ${isInvalid ? 'form__submit--disabled' : ''}`}>Submit</button>
                {errors.server.length > 0 && <div className="form__error">{errors.server}</div>}
            </form>
        )
    }
}

export default SignupForm;
