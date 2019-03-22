import React from 'react';
import { Navbar,
    NavbarBrand,
    Nav,
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { withTranslation } from 'react-i18next';

class NavComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const { t, i18n } = this.props;
        return (
            <React.Fragment>
                <Navbar color="dark" dark expand="md">
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
                    </Nav>
                </Navbar>
            </React.Fragment>
        );
    }
}

const NavComponentPage = withTranslation()(NavComponent)

export { NavComponentPage as NavComponent };
