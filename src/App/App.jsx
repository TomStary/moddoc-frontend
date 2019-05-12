import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';

import { LoginPage, RegistrationPage } from '../Auth';
import { HomePage } from '../Home';
import { NavComponent } from '../Nav';
import { AlertComponent } from '../Alert';
import { AuthRouter } from '../_components';
import { Profile } from '../User';
import { Repositories, RepositoryForm, Repository } from '../Repository';
import { Module } from '../Module';
import { Documents, Document } from '../Document';
import style from './App.scss';

class App extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <React.Fragment>
                <NavComponent />
                <Jumbotron>
                    <Container>
                        <AlertComponent />
                        <Router history={history}>
                            <div>
                                <AuthRouter exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/registration" component={RegistrationPage} />
                                <AuthRouter path="/profile" component={Profile} />
                                <AuthRouter path="/repositories" component={Repositories} />
                                <AuthRouter path="/repository" component={Repository} />
                                <AuthRouter path="/module" component={Module} />
                                <AuthRouter path="/documents" component={Documents} />
                                <AuthRouter path="/document" component={Document} />
                            </div>
                        </Router>
                    </Container>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

const connectedApp = withTranslation()(App);
export { connectedApp as App };