import React from 'react'
import PropTypes from 'prop-types';

class ValidatingInput extends React.Component {

    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        type: PropTypes.string.isRequired,
        handleChange: PropTypes.func,
        handleInvalid: PropTypes.func,
        validators: PropTypes.arrayOf(PropTypes.func)
    }

    constructor() {
        super();
        this.state = {
            blurred: false
        }
    }

    handleBlur = () => {
        this.setState({
            blurred: true
        });
    }

    renderError = (errorText, i) => {
        return (
            <div className="form__error" key={i}>{errorText}</div>
        )
    }

    render() {
        const {label, name, value, type, handleChange, validators, errors} = this.props;
        const { blurred } = this.state;

        return (
            <div className="form-group">
                <label htmlFor={name} className="form__label">{label}</label>
                <input 
                    id={name}
                    type={type} 
                    name={name} 
                    value={value} 
                    onChange={handleChange} 
                    onBlur={() => this.handleBlur()}
                    className="form__input form-control"
                    />
                {blurred && errors && this.renderError(errors)}
            </div>
        )
    }
}

export default ValidatingInput;
