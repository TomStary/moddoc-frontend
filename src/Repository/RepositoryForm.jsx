import { AvForm, AvInput, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import React from 'react';
import { Card, CardBody, Button, Label } from 'reactstrap';
import { withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class RepositoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const { t } = this.props;

        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h3>{t("Repository")}</h3>
                        <AvForm>
                            <AvInput type="hidden" name="id" id="repositoryId" />
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
    }, dispatch);
}

const RepositoryFormComponent = withTranslation()(connect()(RepositoryForm));

export { RepositoryFormComponent as RepositoryForm };
