import config from 'config';
import React from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col, Button } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Cookies
} from 'react-cookie';

import { documentsActions } from '../_actions';
import { refreshToken } from '../_helpers';

class DocumentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.handleGenerate = this.handleGenerate.bind(this);
    }

    handleGenerate() {
        const { match, data } = this.props;
        const cookie = new Cookies();
        //const file = new File(fetch(`${config.apiUrl}/document/build/${match.params.documentId}`, {
        //    method: 'GET'
        //}), data.name);
        refreshToken();
        const token = cookie.get('access_token');
        fetch(`${config.apiUrl}/document/build/${match.params.documentId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            return response.blob()
        }).then(blob => {
            var fileDownload = require('js-file-download');
            fileDownload(blob, data.name, 'application/pdf');
        });
    }

    componentDidMount() {
        const { match } = this.props;
        if (!this.props.loaded) {
            this.props.loadDocument(match.params.documentId);
        }
    }

    render() {
        const { data, loaded, t } = this.props;
        if (!loaded) {
            return (
                <div>Loading</div>
            );
        }
        return (
            <React.Fragment>
                <h3>{t("Document")}:&nbsp;{data.name}</h3>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <Row>
                                <Col>
                                    {t("Body")}
                                </Col>
                                <Col md={{size: 3}}>
                                    <Button block onClick={this.handleGenerate}>{t('Generate')}</Button>
                                </Col>
                            </Row></CardTitle>
                        <CardText className="customTextBox">
                            {data.body}
                        </CardText>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { loaded, data } = state.document;
    return {
        loaded,
        data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadDocument: documentsActions.loadDocument,
    }, dispatch)
}

const DocumentDetailComponent = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(DocumentDetail));

export { DocumentDetailComponent as DocumentDetail };
