import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

import { alertActions } from '../_actions';

class AlertComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.props.hideAlert();
    }

    render() {
        const { alert } = this.props;
        return (
            <React.Fragment>
                {alert.message &&
                    <Alert color={alert.level} toggle={this.onDismiss}>
                        {alert.message}
                    </Alert>}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        hideAlert: alertActions.hideNotification
    },
    dispatch);
}

const alertC = connect(mapStateToProps, mapDispatchToProps)(AlertComponent);
export { alertC as AlertComponent };