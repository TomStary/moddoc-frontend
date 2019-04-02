import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Trans, withTranslation } from 'react-i18next';
import { Button,
    Card,
    CardBody,
    Row,
    Col
} from 'reactstrap';
import { AvGroup, AvForm, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { userActions } from '../_actions'

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
        const { loggingIn, t } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <React.Fragment>
                <Row>
                    <Col md={{ size: 8, offset: 2 }}>
                        <Card>
                            <CardBody>
                                <h3><Trans i18nKey="LOGIN_PAGE_HEADER">trans</Trans></h3>
                                <AvForm name='login' onSubmit={this.handleSubmit}>
                                    <AvGroup>
                                        <AvInput type="text" name="username" id="loginUsername" placeholder={t("Username or email")} onChange={this.handleChange} required />
                                        <AvFeedback>{t("Username or email is required.")}</AvFeedback>
                                    </AvGroup>
                                    <AvGroup>
                                        <AvInput type="password" name="password" id="loginPassword" placeholder={t("Password")} onChange={this.handleChange} required />
                                        <AvFeedback>{t("Password is required.")}</AvFeedback>
                                    </AvGroup>
                                    <Button>{t("Login")}</Button>
                                </AvForm>
                                <Link to="/registration"><Trans i18nKey="REGISTRATION_LINK">reg</Trans></Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = withTranslation()(connect(mapStateToProps)(LoginPage));
export { connectedLoginPage as LoginPage };