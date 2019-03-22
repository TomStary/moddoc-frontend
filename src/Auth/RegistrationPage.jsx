import React from 'react';
import { Link } from 'react-router-dom';
import { Trans, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Row,
    Col,
    Card,
    CardBody,
    Form,
    Input,
    FormGroup,
    Button
} from 'reactstrap';

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
        const { registering, t } = this.props;
        const { user, submited } = this.state;
        return (
            <React.Fragment>
                <Row>
                    <Col md={{ size: 8, offset: 2 }}>
                        <Card>
                            <CardBody>
                                <h3><Trans i18nKey="REGISTRATION_KEY"></Trans></h3>
                                <Form name="registration" onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Input type="text" name="username" value={user.username} placeholder={t("Username")} onChange={this.handleChange}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="email" name="email" value={user.email} placeholder={t("Email")} onChange={this.handleChange}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="password" name="password" value={user.password} placeholder={t("Password")} onChange={this.handleChange}/>
                                    </FormGroup>
                                    <Button>{t("Register")}</Button>
                                </Form>
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
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegistrationPage = withTranslation()(connect(mapStateToProps)(RegistrationPage));
export { connectedRegistrationPage as RegistrationPage };