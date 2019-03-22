import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Trans, withTranslation } from 'react-i18next';
import { Form,
    FormGroup,
    Button,
    Input,
    Card,
    CardBody,
    CardTitle,
    Row,
    Col
} from 'reactstrap';

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
                                <Form name='login' onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Input type="text" name="username" id="loginUsername" placeholder={t("Username or email")} onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="password" name="password" id="loginPassword" placeholder={t("Password")} onChange={this.handleChange} />
                                    </FormGroup>
                                    <Button>Login</Button>
                                </Form>
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