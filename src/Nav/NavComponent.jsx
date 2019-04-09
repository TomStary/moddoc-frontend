import React from 'react';
import { connect } from 'react-redux';
import { Navbar,
    NavbarBrand,
    Nav,
    Row,
    Col,
    Container,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem,
    NavLink
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { UserNav } from './'

class NavComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const { t, i18n } = this.props;

        return (
            <React.Fragment>
                <Navbar color="dark" dark expand="lg">
                    <Container>
                        <NavbarBrand href="/">Moddoc</NavbarBrand>
                        <Nav ml="auto" navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle nav caret>
                                    {t("Language")}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => i18n.changeLanguage('en')}>
                                        {t("English")}
                                    </DropdownItem>
                                    <DropdownItem onClick={() => i18n.changeLanguage('cs')}>
                                        {t("Czech")}
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UserNav />
                        </Nav>
                    </Container>
                </Navbar>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const NavComponentPage = connect(mapStateToProps)(withTranslation()(NavComponent))

export { NavComponentPage as NavComponent };
