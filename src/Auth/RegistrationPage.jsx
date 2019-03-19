import React from 'react';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';

import { userActions } from '../_actions'

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                email: '',
                password: '',
            },
            submited: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        if (user.username && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submited } = this.state;
        return (
            <div>
                <h2><Trans i18nKey="REGISTRATION_KEY"></Trans></h2>
                <form name="registration" onSubmit={this.handleSubmit}>
                    <input type="text" name="username" value={user.username} onChange={this.handleChange}/>
                    <input type="text" name="email" value={user.email} onChange={this.handleChange}/>
                    <input type="password" name="password" value={user.password} onChange={this.handleChange}/>
                    <button>Register</button>
                </form>
                <Link to="/login"><Trans i18nkey="BACK_TO_LOGIN"></Trans></Link>
            </div>
        );

    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegistrationPage = connect(mapStateToProps)(RegistrationPage);
export { connectedRegistrationPage as RegistrationPage };