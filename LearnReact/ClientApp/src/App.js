import React from 'react';
import { Route } from 'react-router';
import { PrivateRoute } from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './containers/Login';
import BaseData from './containers/BaseData';
import CreateInspection from './containers/CreateInspection';
import Logout from './components/Logout';

export default () => (
    <Layout>
        <Route exact path='/' component={Login} />
        <PrivateRoute path='/baseData' component={BaseData} />
        <PrivateRoute path='/form' component={CreateInspection} />
        <Route path='/logout' component={Logout} />
    </Layout>
);
