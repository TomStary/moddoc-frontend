import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import { Button, Row, Col, Container } from 'reactstrap';
import { bindActionCreators } from 'redux';

import { RepositoryForm } from '.';
import { repositoryActions } from '../_actions';

class Repositories extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        if (!this.props.loaded) {
            this.props.getRepositories();
        }
    }

    render() {
        const { loaded, t, data } = this.props;
        const columns = [{
            Header: t("Name"),
            accessor: 'name',
            Cell: cellInfo => (<Link to={`/repository/${cellInfo.original.id}`}>{cellInfo.row.name}</Link>),
        }, {
            id: 'owner',
            Header: t("Owner"),
            accessor: d => d.owner.username,
        }];

        console.log(data);
        return (
            <React.Fragment>
                <Container>
                    <Row className="mb-4">
                        <Col md={{offset: 8, size: 4}}>
                            <Button tag={Link} to="/repository/create">{t("Create new repository")}</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ReactTable
                                loading={!loaded}
                                data={data}
                                columns={columns}
                                pageSize={data.length == 0 ? 2 : 20}
                                className="-striped -highlight"
                                />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getRepositories: repositoryActions.getRepositories
    }, dispatch)
}

const RepositoriesComponent = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Repositories));

export { RepositoriesComponent as Repositories };