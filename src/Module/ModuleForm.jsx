import { AvForm, AvInput, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import React from 'react';
import { Card, CardBody, CardTitle, Button, Label } from 'reactstrap';
import { withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { modulesActions } from '../_actions';

class ModuleForm extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, errors, values) {
        if (errors.length == 0) {
            this.props.createModule(values);
        }
    }

    render() {
        const { t } = this.props;
        const module = {
            name: "",
            body: "",
            repository_id: this.props.match.params.repositoryId,
        };
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <h3>{t("Module")}</h3>
                        </CardTitle>
                        <AvForm onSubmit={this.handleSubmit} model={module}>
                            <AvInput type="hidden" name="repository_id" id="repositoryId" />
                            <AvGroup>
                                <Label>{t("Name")}</Label>
                                <AvInput type="text" name="name" id="moduleName" required />
                                <AvFeedback>{t("Name is required.")}</AvFeedback>
                            </AvGroup>
                            <AvGroup>
                                <Label>{t("Body")}</Label>
                                <AvInput type="textarea" rows="5" name="body" id="moduleBody" />
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
        createModule: modulesActions.createModule,
    }, dispatch);
}

const ModuleFormComponent = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ModuleForm))

export { ModuleFormComponent as ModuleForm };