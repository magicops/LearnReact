import React from 'react';
import { Route } from 'react-router';
import { PrivateRoute } from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './components/Login';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import CreateInspection from './components/CreateInspection';
import Logout from './components/Logout';

export default () => (
    <Layout>
        <Route exact path='/' component={Login} />
        <PrivateRoute path='/counter' component={Counter} />
        <PrivateRoute path='/fetchdata/:startDateIndex?' component={FetchData} />
        <PrivateRoute path='/form' component={CreateInspection} />
        <Route path='/logout' component={Logout} />
    </Layout>
);
