import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { modulesActions } from '../_actions';

class ModuleDetail extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        const { match } = this.props;
        if (!this.props.loaded) {
            this.props.loadModule(match.params.moduleId);
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
                <h3>{t("Module")}:&nbsp;{data.name}</h3>
                <Card>
                    <CardBody>
                        <CardTitle>{t("Body")}</CardTitle>
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
    const { loaded, data } = state.module;
    return {
        loaded,
        data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadModule: modulesActions.loadModule,
    }, dispatch)
}

const ModuleDetailComponent = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ModuleDetail));

export { ModuleDetailComponent as ModuleDetail };
