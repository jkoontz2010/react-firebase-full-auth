import React from 'react';
import PropTypes from 'prop-types';

class ProviderAuth extends React.Component {
    static propTypes = {
        actionText: PropTypes.string.isRequired,
        firebaseApp: PropTypes.object.isRequired,
        handleAuth: PropTypes.func.isRequired
    }
    authenticate = (provider) => {
        const { firebaseApp } = this.props;
        try {
            let authProvider;
            switch(provider) {
                case 'facebook':
                    authProvider = new firebase.auth.FacebookAuthProvider();
                    break;
                case 'google':
                    authProvider = new firebase.auth.GoogleAuthProvider();
                    break;

            }

            authProvider.setCustomParameters({
                'display': 'popup'
            });

            firebaseApp.auth().signInWithPopup(authProvider).then(this.props.handleAuth);
            
        } catch (ex) {
            console.error(ex);
        }
    }

    render() {
        const {
            actionText,
            firebaseApp,
            handleAuth
        } = this.props;

        return (
            <div className="auth-provider">
                <button className="auth-provider__button auth-provider__button--facebook" 
                    onClick={() => this.authenticate('facebook')}
                    >
                    {actionText} with Facebook
                </button>
                <button className="auth-provider__button auth-provider__button--google" 
                    onClick={() => this.authenticate('google')}
                    >
                    {actionText} with Google
                </button>
            </div>
        )
    }
}

export default ProviderAuth;