import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import TestFrom from './components/TestFrom';
import CreateInspection from './components/CreateInspection';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
        <Route path='/test' component={TestFrom} />
        <Route path='/form' component={CreateInspection} />
    </Layout>
);
