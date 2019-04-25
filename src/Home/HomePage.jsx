import React from 'react';
import { Row, Col, Card,
    CardBody, CardImg,
    CardImgOverlay, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Folder from '@material-ui/icons/Folder';

class HomePage extends React.Component {
    render() {
        const { user, t } = this.props;
        return (
            <React.Fragment>
                <h2>{t("Welcome")}&nbsp;{user.username}!</h2>
                <Row>
                    <Col sm={{size: 3}}>
                        <Card tag={Link} to="/repositories">
                            <CardTitle>{t("Repositories")}</CardTitle>
                            <CardBody>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
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

const connectedHomePage = connect(mapStateToProps)(withTranslation()(HomePage));
export { connectedHomePage as HomePage };