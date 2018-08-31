import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';

export default props => (
    <Grid className="full-height" fluid>
        <Row className="full-height">
            <Col sm={3}>
                <NavMenu />
            </Col>
            <Col sm={9} className="full-height">
                {props.children}
            </Col>
        </Row>
    </Grid>
);
