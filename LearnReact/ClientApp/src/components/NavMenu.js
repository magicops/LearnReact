import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { labels } from '../constants';
import * as Auth from '../helpers/Auth';

export default props => {
    let links = [],
        i = 0;

    if (Auth.userIsAuthenticated()) {
        links.push(<LinkContainer key={++i} to={'/baseData'}><NavItem><Glyphicon glyph='tasks' /> {labels.baseData}</NavItem></LinkContainer>);
        links.push(<LinkContainer key={++i} to={'/form'}><NavItem><Glyphicon glyph='th-list' /> {labels.inspectionForm}</NavItem></LinkContainer>);
        links.push(<LinkContainer key={++i} to={'/logout'}><NavItem><Glyphicon glyph='log-out' /> {labels.logout}</NavItem></LinkContainer>);
    }
    else {
        links.push(<LinkContainer key={++i} to={'/'}><NavItem><Glyphicon glyph='user' /> {labels.login}</NavItem></LinkContainer>);
    }


    return (
        <Navbar inverse fixedTop fluid collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to={'/'}>{labels.projectTitle}</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    {links}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};
