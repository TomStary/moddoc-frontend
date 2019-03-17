import React from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            username: '',
            password: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { login } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div>
                <h2><Trans i18nKey="LOGIN_PAGE_HEADER">trans</Trans></h2>
                <form name='login'>
                    <input type="text" name="username" value={username} onChange={this.handleChange} />
                    <input type="password" name="password" value={password} onChange={this.handleChange} />
                    <button>Login</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };