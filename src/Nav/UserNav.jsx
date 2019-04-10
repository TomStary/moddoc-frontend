import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import { userActions } from '../_actions';

class UserNav extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            loggingOut: false
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.setState({ loggingOut: true });
        const { dispatch } = this.props;
        dispatch(userActions.logout())
    }

    render() {
        const { t, loggedIn } = this.props;

        if (loggedIn) {
            console.log(this.props);
            const { user } = this.props;
            return (
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        {user.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            {t("Profile")}
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.logout}>
                            {t("Logout")}
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        }

        return null;
    }
}

function makeStateToProps(state) {
    const { authentication } = state;
    const { loggedIn } = authentication;

    if (loggedIn) {
        const { user } = authentication;

        return {
            user,
            loggedIn
        }
    }

    return {
        loggedIn
    };
}

const UserNavComponent = connect(makeStateToProps)(withTranslation()(UserNav))

export { UserNavComponent as UserNav };
