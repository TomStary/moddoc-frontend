import { AvForm, AvInput, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import React from 'react';
import { Card, CardBody, Button, Label } from 'reactstrap';
import { withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { repositoryActions } from '../_actions';

class RepositoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, errors, values) {
        if (errors.length == 0) {
            this.props.createOrUpdate(values);
        }
    }

    render() {
        const { t } = this.props;

        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h3>{t("Repository")}</h3>
                        <AvForm onSubmit={this.handleSubmit}>
                            <AvGroup>
                                <Label>{t("Name")}</Label>
                                <AvInput type="text" name="name" id="repositoryName" required />
                                <AvFeedback>{t("Name is required.")}</AvFeedback>
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
    return bindActionCreators(
    {
        createOrUpdate: repositoryActions.createOrUpdateRepository
    }, dispatch);
}

const RepositoryFormComponent = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(RepositoryForm));

export { RepositoryFormComponent as RepositoryForm };
