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
            errors: [],
            blurred: false
        }
    }

    componentDidMount() {
        // run validation initially, but won't display errors
        this.runValidate();
    }
    componentDidUpdate(prevProps) {
        const currentValue = this.props.value;

        if(this.props.reset === true && this.state.blurred === true) {
            this.setState({
                blurred: false,
                errors: []
            })
        }

        if(prevProps.value !== currentValue) {
            this.runValidate();
        }
    }
    handleBlur = () => {
        this.setState({
            blurred: true
        });
        this.runValidate();
    }

    runValidate = () => {
        const { name, value, validators, handleValidity } = this.props;

        const errorList = validators.reduce((errs, validator) => {
            const validation = validator(value);
            const validity = validation === undefined || validation.length === 0;

            const errArray = errs.length > 0 ? errs : [];
            if(validity === false) { 
                errArray.push(validation);
            }
            return errArray;
        }, []);

        this.setState({
            errors: errorList[0]
        })

        handleValidity(name, errorList.length);
    }

    renderError = (errorText, i) => {
        return (
            <div className="form__error" key={i}>{errorText}</div>
        )
    }

    render() {
        const {label, name, value, type, handleChange, validators} = this.props;
        const { errors, blurred } = this.state;

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
