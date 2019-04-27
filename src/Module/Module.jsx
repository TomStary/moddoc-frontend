import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ModuleForm, ModuleDetail } from '.';

class Module extends React.Component {
    render() {
        const { match } = this.props;
        return (
            <React.Fragment>
                <Switch>
                    <Route path={`${match.url}/:moduleId`} component={ModuleDetail} />
                    <Route path={`${match.url}/create/:repositoryId`} component={ModuleForm} />
                </Switch>
            </React.Fragment>
        )
    }
}

export { Module };