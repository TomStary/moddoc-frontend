import { AvForm, AvInput, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import React from 'react';
import { Card, CardBody, CardTitle, Button, Label } from 'reactstrap';
import { withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { documentsActions } from '../_actions';

class DocumentForm extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, errors, values) {
        if (errors.length == 0) {
            this.props.createDocument(values);
        }
    }

    render() {
        const { t } = this.props;
        const document = {
            name: "",
            body: "",
        };
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <h3>{t("Document")}</h3>
                        </CardTitle>
                        <AvForm onSubmit={this.handleSubmit} model={document}>
                            <AvGroup>
                                <Label>{t("Name")}</Label>
                                <AvInput type="text" name="name" id="documentName" required />
                                <AvFeedback>{t("Name is required.")}</AvFeedback>
                            </AvGroup>
                            <AvGroup>
                                <Label>{t("Body")}</Label>
                                <AvInput type="textarea" rows="5" name="body" id="documentBody" />
                            </AvGroup>
                            <Button><Trans i18nKey="CREATE"></Trans></Button>
                        </AvForm>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createDocument: documentsActions.createDocument,
    }, dispatch);
}

const DocumentFormComponent = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(DocumentForm))

export { DocumentFormComponent as DocumentForm };