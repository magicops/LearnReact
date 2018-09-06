import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as Auth from '../helpers/Auth';

const Logout = () => {
    Auth.logout();

    return <Redirect to="/" />;
}

export default connect()(Logout);