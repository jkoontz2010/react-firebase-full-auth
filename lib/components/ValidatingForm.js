import React from 'react'


class ValidatingForm extends React.Component {
    constructor() {
        super();
        this.state = {
            invalidCount: {},
            model: {},
            reset: false
        }
    }
    handleInputChange = (event) => {        
        const { name, value } = event.target;

        this.setState({
            model: Object.assign({}, this.state.model, {[name]: value})
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
                value: this.state.model[fieldName] || ""
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
