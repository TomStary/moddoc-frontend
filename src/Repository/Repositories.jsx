import React from 'react';
import { connect } from 'react-redux';


class Repositories extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const { loaded } = this.props;
        if (!loaded) {
            return (
                <div>
                    Loading
                </div>
            );
        }
        return null;
    }
}

function mapStateToProps(state) {
    const { repositories } = state;
    const { loaded, data } = repositories;
    return {
        loaded,
        data
    };
}

const RepositoriesComponent = connect(mapStateToProps)(Repositories);

export { RepositoriesComponent as Repositories };