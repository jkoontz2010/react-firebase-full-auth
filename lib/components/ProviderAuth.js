import React from 'react';
import PropTypes from 'prop-types';

class ProviderAuth extends React.Component {
    static propTypes = {
        actionText: PropTypes.string.isRequired,
        firebaseApp: PropTypes.object.isRequired
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

            firebaseApp.auth().signInWithPopup(authProvider).then(this.handleAuth).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log("ERRPR", erorr)
            });
            
        } catch (ex) {
            console.error(ex);
        }
    }

    handleAuth = (result) => {

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        console.log("AUTHED", token, user)  

    }
    render() {
        const {
            actionText,
            firebaseApp
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