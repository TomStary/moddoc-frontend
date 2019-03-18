import React from 'react';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';

import { userActions } from '../_actions'

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            user: {
                username: '',
                email: '',
                password: '',
            },
            submited: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submited: true });

        const { user } = this.state;
        const { dispatch } = this.props;

        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { user, submited } = this.state;
        return (
            <div>
                <h2><Trans i18nKey="REGISTRATION_KEY"></Trans></h2>
                <form>
                    <input type="text" name="username" value={user.username} onChange={handleChange}/>
                    <input type="text" name="email" value={user.email} onChange={handleChange}/>
                    <input type="password" name="password" value={user.password} onChange={handleChange}/>
                    <button>Register</button>
                </form>
            </div>
        );

    }
}

function mapStateToProps(state) {
    const { registration } = state.authentication;
    return {
        registration
    };
}

const connectedRegistrationPage = connect(mapStateToProps)(RegistrationPage);
export { connectedRegistrationPage as RegistrationPage };