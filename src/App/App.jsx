import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { alertActions } from '../_actions';
import { history } from '../_helpers';
import { LoginPage } from '../Auth';
import { HomePage } from '../Home';
import { AuthRouter } from '../_components';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            console.log("listening");
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className="alert">{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <AuthRouter exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
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