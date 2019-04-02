import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col, Jumbotron, Alert } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

import { alertActions } from '../_actions';
import { history } from '../_helpers';
import { LoginPage, RegistrationPage } from '../Auth';
import { HomePage } from '../Home';
import { NavComponent } from '../Nav';
import { AuthRouter } from '../_components';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
        };

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    render() {
        const { alert, t } = this.props;
        return (
            <React.Fragment>
                <NavComponent />
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col sm={{ size: 8, offset: 2 }}>
                                {alert.message &&
                                    <Alert color={alert.type} isOpen={this.state.visible} toggle={this.onDismiss}>
                                        {t(alert.message)}
                                    </Alert>
                                }
                                <Router history={history}>
                                    <div>
                                        <AuthRouter exact path="/" component={HomePage} />
                                        <Route path="/login" component={LoginPage} />
                                        <Route path="/registration" component={RegistrationPage} />
                                    </div>
                                </Router>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = withTranslation()(connect(mapStateToProps)(App));
export { connectedApp as App };