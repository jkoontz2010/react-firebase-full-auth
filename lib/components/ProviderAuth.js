import React from 'react';
import PropTypes from 'prop-types';

class ProviderAuth extends React.Component {
    static propTypes = {
        actionText: PropTypes.string.isRequired
    }
    authenticate = (provider) => {
        console.log(provider);
    }
    render() {
        const {
            actionText
        } = this.props;

        return (
            <div className="auth-provider">
                <button className="auth-provider__button auth-provider__button--facebook" onClick={() => this.authenticate('facebook')}>{actionText} with Facebook</button>
                <button className="auth-provider__button auth-provider__button--google" onClick={() => this.authenticate('google')}>{actionText} with Google</button>
            </div>
        )
    }
}

export default ProviderAuth;