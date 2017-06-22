import React from 'react'


class ValidatingForm extends React.Component {
    constructor() {
        super();
        this.state = {
            invalidCount: {},
            model: {},
            reset: false,
            validators: {},
            errors: {},
            blurred: {}
        }
    }
    componentDidMount() {
        const validators = {};
        this.props.children.map((child) => {
            if(child && child.type.name === "ValidatingInput") {
                console.log(child.props.name, child.props.validators)
                validators[child.props.name] = child.props.validators;
            }
        })

        this.setState({
            validators
        })
    }

    handleInputChange = (event) => {        
        const { name, value } = event.target;
        const validators = this.state.validators[name];

        // TODO: run validators here by calling the array of validators given to that input. 
        // may need to access validators from a hashmap.
        if(validators) {
            this.runValidators(name, value, validators)
        }

        this.setState({
            model: Object.assign({}, this.state.model, {[name]: value})
        });
    }

    runValidators = (name, value, validators) => {

        const errorList = validators.reduce((errs, validator) => {
            const validation = validator(value);
            const validity = validation === undefined || validation.length === 0;

            const errArray = errs.length > 0 ? errs : [];
            if(validity === false) { 
                errArray.push(validation);
            }
            return errArray;
        }, []);

        console.log("validated", errorList)

        this.setState({
            errors: Object.assign({}, this.state.errors, {[name]: errorList})
        }, console.log(this.state.errors))

        this.handleValidity(name, errorList.length);
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

    handleSubmit = (event, submitCb) => {
        event.preventDefault();
        submitCb(this.state.model);
    }
    handleChildren = (child) => {
        if(child && child.type.name === "ValidatingInput") {
            const fieldName = child.props.name;

            const additionalProps = {
                handleChange: this.handleInputChange,
                handleValidity: this.handleValidity,
                value: this.state.model[fieldName] || "",
                errors: this.state.errors[fieldName] ? this.state.errors[fieldName] : "",
                blurred: this.state.blurred[fieldName] ? true : false,
                onBlur: (event) => { console.log("blurred", event.target.name)}
            }
           
            const resetFlag = this.state.reset ? {reset: true} : {};
            const validatingChild = React.cloneElement(child, Object.assign(additionalProps, resetFlag));

            if(this.state.reset) this.setState({reset: false})
            return validatingChild;
        }

        if(child && child.props.type === "submit") {
            const classNames = child.props.className;

            if(!this.isValid()) {
                return React.cloneElement(child, {disabled: true, className: classNames + " form__submit--disabled"})
            }
        }
        return child;
    }
    render() {
        const { onSubmit, className } = this.props;

        return (
            <form onSubmit={(event) => this.handleSubmit(event, onSubmit)} className={className}>
                {React.Children.map(this.props.children, this.handleChildren)}
            </form>
        )

    }
}

export default ValidatingForm;
