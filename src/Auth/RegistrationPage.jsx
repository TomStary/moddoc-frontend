import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Trans, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { Row,
    Col,
    Card,
    CardBody,
    Button
} from 'reactstrap';
import {
    AvForm,
    AvGroup,
    AvInput,
    AvFeedback
} from 'availity-reactstrap-validation';

import { userActions } from '../_actions'

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, errors, values) {
        if (values.username && values.email && values.password) {
            this.props.register(values);
        }
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
                                <h3><Trans i18nKey="REGISTRATION_KEY"></Trans></h3>
                                <AvForm name='registration' onSubmit={this.handleSubmit}>
                                    <AvGroup>
                                        <AvInput type="text" name="username" id="registrationUsername" placeholder={t("Username")} required />
                                        <AvFeedback>{t("Username is required.")}</AvFeedback>
                                    </AvGroup>
                                    <AvGroup>
                                        <AvInput type="text" name="email" id="registrationEmail" placeholder={t("Email")} required />
                                        <AvFeedback>{t("Email is required.")}</AvFeedback>
                                    </AvGroup>
                                    <AvGroup>
                                        <AvInput type="password" name="password" id="registrationPassword" placeholder={t("Password")} required />
                                        <AvFeedback>{t("Password is required.")}</AvFeedback>
                                    </AvGroup>
                                    <Button>{t("Registration")}</Button>
                                </AvForm>
                                <Link to="/login"><Trans i18nKey="BACK_TO_LOGIN"></Trans></Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );

    }
}

function mapStateToProps(state) {
    const { registration } = state;
    const { registered } = registration;
    const { authentication } = state;
    const { loggedIn } = authentication;
    return {
        registered,
        loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        register: userActions.register,
        push
    }, dispatch)
}

const connectedRegistrationPage = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(RegistrationPage));
export { connectedRegistrationPage as RegistrationPage };