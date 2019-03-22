import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col, Jumbotron, Alert } from 'reactstrap';

import { alertActions } from '../_actions';
import { history } from '../_helpers';
import { LoginPage, RegistrationPage } from '../Auth';
import { HomePage } from '../Home';
import { NavComponent } from '../Nav';
import { AuthRouter } from '../_components';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <React.Fragment>
                <NavComponent />
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col sm={{ size: 8, offset: 2 }}>
                                {alert.message &&
                                    <Alert color="warning">{alert.message}</Alert>
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

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };