import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { RepositoryForm, RepositoryDetail } from '.';

class Repository extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const { match } = this.props;
        return (
            <React.Fragment>
                <Switch>
                    <Route path={`${match.url}/create`} component={RepositoryForm} />
                    <Route path={`${match.url}/:repositoryId`} component={RepositoryDetail} />
                </Switch>
            </React.Fragment>
        );
    }
}

export { Repository }