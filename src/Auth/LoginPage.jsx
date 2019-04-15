import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Trans, withTranslation } from 'react-i18next';
import { Button,
    Card,
    CardBody,
    Row,
    Col
} from 'reactstrap';
import { AvGroup, AvForm, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { userActions, alertActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e, err, val) {
        if (val.username && val.password) {
            this.props.login(val);
        }
    }

    componentDidMount() {
        this.props.checkLoginStatus();
    }

    render() {
        const { t, loggedIn } = this.props;
        if (loggedIn) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <React.Fragment>
                <Row>
                    <Col md={{ size: 8, offset: 2 }}>
                        <Card>
                            <CardBody>
                                <h3><Trans i18nKey="LOGIN_PAGE_HEADER">trans</Trans></h3>
                                <AvForm name='login' onSubmit={this.handleSubmit}>
                                    <AvGroup>
                                        <AvInput type="text" name="username" id="loginUsername" placeholder={t("Username or email")} required />
                                        <AvFeedback>{t("Username or email is required.")}</AvFeedback>
                                    </AvGroup>
                                    <AvGroup>
                                        <AvInput type="password" name="password" id="loginPassword" placeholder={t("Password")} required />
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
    const { authentication } = state;
    const { loggedIn } = authentication;
    return {
        loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            login: userActions.login,
            checkLoginStatus: userActions.loginStatus,
            alert: alertActions.showNotification,
        },
        dispatch
    );
}

const connectedLoginPage = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
export { connectedLoginPage as LoginPage };