import React from 'react';
import { connect } from 'react-redux';
import { withTranslation, Trans } from 'react-i18next';
import { bindActionCreators } from 'redux';

import { repositoryActions } from '../_actions';
import { Modules } from '../Module';

class RepositoryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        const { loaded, match } = this.props;
        if (!loaded) {
            this.props.loadRepository(match.params.repositoryId);
        }
    }

    render() {
        const { loaded, data } = this.props;
        if (!loaded) {
            return (
                <div>Loading</div>
            );
        }

        return (
            <React.Fragment>
                <h3><Trans i18nKey="REPOSITORY_HEADER">repository</Trans>:&nbsp;{data.name}</h3>
                <Modules repositoryId={data.id} />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { repository } = state;
    const { loaded, data } = repository;
    return {
        loaded,
        data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadRepository: repositoryActions.getRepository,
    }, dispatch);
}

const RepositoryDetailComponent = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(RepositoryDetail));

export { RepositoryDetailComponent as RepositoryDetail };