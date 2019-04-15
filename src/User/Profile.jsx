import React from 'react';
import { connect } from 'react-redux';
import { withTranslation, Trans } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { Row,
    Col,
    Card,
    CardBody,
    Label,
    Button } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { userActions } from '../_actions';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, errors, values) {
    }

    componentDidMount() {
        if (!this.props.profile.loaded) {
            this.props.getProfile();
        }
    }

    render() {
        const { profile, user, t } = this.props;
        if (!profile.loaded) {
            return (
                <div>
                    Loading
                </div>
            )
        }
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h3>{t("Your profile")}</h3>
                        <AvForm name='user' onSubmit={this.handleSubmit}>
                            <AvGroup>
                                <Label>{t("Username")}</Label>
                                <AvInput type="text" name="username" id="profileUsername" value={user.username} required />
                                <AvFeedback>{t("Username is required.")}</AvFeedback>
                            </AvGroup>
                            <AvGroup>
                                <Label>{t("Email")}</Label>
                                <AvInput type="email" name="email" id="profileEmail" value={user.email} required />
                                <AvFeedback>{t("Email is required.")}</AvFeedback>
                            </AvGroup>
                            <Button><Trans i18nKey="UPDATE"></Trans></Button>
                        </AvForm>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { profile } = state;
    const { user } = profile;
    return {
        profile,
        user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
    {
        getProfile: userActions.getProfile
    }, dispatch);
}

const ProfileComponent = withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Profile));

export { ProfileComponent as Profile };
