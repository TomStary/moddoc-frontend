import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { DocumentForm, DocumentDetail } from '.';

class Document extends React.Component {
    render() {
        const { match } = this.props;
        return (
            <React.Fragment>
                <Switch>
                    <Route path={`${match.url}/create`} component={DocumentForm} />
                    <Route path={`${match.url}/:documentId`} component={DocumentDetail} />
                </Switch>
            </React.Fragment>
        );
    }
}

export { Document };
