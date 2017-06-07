import React from 'react';

export class LoginForm extends React.Component {
    render() {
        return (
            <form>
                <label>email
                    <input type="text"/>
                </label>
                <label>password
                    <input type="text"/>
                </label>
            </form>
        )
    }
}
