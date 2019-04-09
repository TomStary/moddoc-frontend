import React from 'react';
import { Link } from 'react-router-dom';
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
import { store } from '../_store';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        const { username, password } = this.state;
        const { i18n } = this.props;
        if (username && password) {
            this.props.login(username, password);
            store = store.getStore();
            if (store.authentication.loggedIn)
                this.props.alert("success", i18n.t('Successfully logged in.'));
            else
                this.props.alert("error", store.authentication.error);
        }
    }

    render() {
        const { t } = this.props;
        const { username, password } = this.state;
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
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            login: userActions.login,
            alert: alertActions.showNotification
        },
        dispatch
    );
}

const connectedLoginPage = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
export { connectedLoginPage as LoginPage };