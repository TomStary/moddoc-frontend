import React from 'react';
import { bindActionCreators } from 'redux';
import { Card, CardBody, CardTitle,
    Button, Row, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import { documentsActions } from '../_actions';

class Documents extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        if (!this.props.loaded) {
            this.props.getAllDocuments();
        }
    }

    render() {
        const { loaded, data, t} = this.props;
        const columns = [{
            Header: t("Name"),
            Cell: cellInfo => (<Link to={`/document/${cellInfo.original.id}`}>{cellInfo.row.name}</Link>),
        }];

        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <Col>
                                <h3>
                                    {t("Documents")}
                                </h3>
                            </Col>
                        </CardTitle>
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
    const { documents } = state;
    const { data, loaded } = documents;
    return {
        data,
        loaded,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllDocuments: documentsActions.getAllDocuments,
    }, dispatch);
}

const DocumentsComponent = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Documents));

export { DocumentsComponent as Documents };