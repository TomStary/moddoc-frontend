import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import { bindActionCreators } from 'redux';

import { modulesActions } from '../_actions';

class Modules extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        if (!this.props.loaded) {
            this.props.getModules(this.props.repositoryId);
        }
    }

    render() {
        const { loaded, data, t } = this.props;
        const columns = [{
            Header: t("Name"),
            accessor: 'name',
            Cell: cellInfo => (<Link to={`/module/${cellInfo.original.id}`}>{cellInfo.row.name}</Link>),
        }];

        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <ReactTable
                            loading={!loaded}
                            data={data}
                            columns={columns}
                            pageSize={data.length == 0 ? 2 : 20}
                            className="-striped -highlight"
                            />
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { modules } = state;
    const { data, loaded } = modules;
    return {
        data,
        loaded,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getModules: modulesActions.getAllModulesForRepository,
    }, dispatch);
}

const ModulesComponent = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Modules));

export { ModulesComponent as Modules };